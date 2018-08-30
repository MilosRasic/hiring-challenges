import React from 'react';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import Spinner from './Spinner';
import store from '../redux/store';
import {fetchList} from '../redux/actionCreators/adsActionCreators';

export class List extends React.Component {
	static propTypes = {
		ads: PropTypes.array,
		loading: PropTypes.bool,
		fetchList: PropTypes.func.isRequired,
		nextPage: PropTypes.number,
	};

	componentDidMount() {
		if (!this.props.ads && !this.props.loading) {
			this.props.fetchList();
		}
	}

	loadMore = () => {
		this.props.fetchList(this.props.nextPage);
	};

	render() {
		return (
			<React.Fragment>
				<Masonry options={{horizontalOrder: true}}>
					{this.props.loading && !this.props.ads ? <Spinner offset="100px" /> : undefined}

					{this.props.ads && this.props.ads.map(ad => <ListItem ad={ad} key={ad.id} />)}
				</Masonry>

				{this.props.ads && !this.props.loading && this.props.nextPage && <div className="load-more" onClick={this.loadMore} data-test="load_more">Load more</div>}

				{this.props.ads && this.props.loading && <Spinner size={0.5} />}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	ads: state.list,
	loading: state.listLoading,
	nextPage: state.nextPage,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchList,
		}, dispatch);

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export default props => (
	<Provider store={store}>
		<ConnectedList {...props} />
	</Provider>
);
