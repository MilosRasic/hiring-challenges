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
			<div style={styles.page}>
				<Link to="/" style={styles.backWrapper}>
					<strong style={styles.backText}>&laquo;</strong>
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

const styles = {
	page: {
		position: 'relative',
		borderTop: '1px solid #33adea',
	},
	backWrapper: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '50px',
		height: '50px',
		display: 'block',
		paddingTop: '5px',
		backgroundColor: '#d9d9d9',
		color: '#333',
	},
	backText: {
		fontSize: '40px',
		lineHeight: '50px',
	},
};