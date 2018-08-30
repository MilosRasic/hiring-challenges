import React from 'react';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import store from '../redux/store';
import {fetchAd, clearCurrentAd} from '../redux/actionCreators/adsActionCreators';
import AdDetails from './AdDetails';

export class Ad extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		fetchAd: PropTypes.func.isRequired,
		clearCurrentAd: PropTypes.func.isRequired,
		ad: PropTypes.object,
		error: PropTypes.string,
		loading: PropTypes.bool,
	};

	componentDidMount() {
		this.props.fetchAd(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.clearCurrentAd();
	}

	render() {
		return (
			<div className="ad-page">
				<Link to="/" className="back">
					<strong className="back-text">&laquo;</strong>
				</Link>

				<AdDetails ad={this.props.ad} error={this.props.error} loading={this.props.loading} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	ad: state.current,
	loading: state.currentLoading,
	error: state.currentError,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchAd,
			clearCurrentAd,
		}, dispatch);

const ConnectedAd = connect(mapStateToProps, mapDispatchToProps)(Ad);

export default props => (
	<Provider store={store}>
		<ConnectedAd {...props} />
	</Provider>
);
