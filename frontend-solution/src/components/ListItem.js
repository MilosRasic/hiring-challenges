import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from 'react-graceful-image';
import {parse} from 'date-fns'

export default function ListItem(props) {
	return (
		<div className={props.ad.gallery ? 'list-item-wrapper list-item-highlight' : 'list-item-wrapper'}>
			<h3 className="list-item-title">{props.ad.subject}</h3>
			<div>
				{props.ad.thumb_name ? <Image alt={props.ad.subject} src={`https://c.tutti.ch/thumbs/${props.ad.thumb_name}`} width="121" height="90" className="list-item-thumb" noLazyLoad /> 
				: <div className="list-item-thumb-placeholder"></div>}
				<p className="list-item-text">{props.ad.body}</p>
			</div>
			<div className="clear-both" />
			<div className="list-item-content">
				<div className="list-item-left">{new Intl.DateTimeFormat(navigator.language).format(parse(props.ad.time * 1000))}</div>
				<div className="list-item-middle"><Link to={`/${props.ad.id}`}>details</Link></div>
				<div className="list-item-right">{props.ad.price}</div>
			</div>
		</div>
	);
}

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
	ad: PropTypes.object,
};
