import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from 'react-graceful-image';
import {parse} from 'date-fns'

export default function ListItem(props) {
	return (
		<div style={props.ad.gallery ? {...styles.wrapper, ...styles.highlight} : styles.wrapper}>
			<h3 style={{marginTop: '5px'}}>{props.ad.subject}</h3>
			<div>
				{props.ad.thumb_name ? <Image alt={props.ad.subject} src={`https://c.tutti.ch/thumbs/${props.ad.thumb_name}`} width="121" height="90" style={styles.thumb} noLazyLoad /> 
				: <div style={styles.thumbPlaceholder}></div>}
				<p style={styles.text}>{props.ad.body}</p>
			</div>
			<div style={{clear: 'both'}} />
			<div style={{marginTop: '10px'}}>
				<div style={styles.left}>{new Intl.DateTimeFormat(navigator.language).format(parse(props.ad.time * 1000))}</div>
				<div style={styles.middle}><Link to={`/${props.ad.id}`}>details</Link></div>
				<div style={styles.right}>{props.ad.price}</div>
			</div>
		</div>
	);
}

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
	ad: PropTypes.object,
};

const styles = {
	wrapper: {
		width: '23%',
		border: '1px solid #33adea',
		borderRadius: '6px',
		padding: '5px',
		paddingLeft: '10px',
		marginLeft: '10px',
		marginTop: '5px',
		overflow: 'hidden',
	},
	highlight: {
		backgroundColor: '#fff4cd',
	},
	text: {
		whiteSpace: 'pre-wrap',
		textAlign: 'left',
	},
	left: {
		float: 'left',
	},
	right: {
		float: 'right',
	},
	middle: {
		display: 'inline-block',
	},
	thumb: {
		float: 'left',
		marginRight: '10px',
	},
	thumbPlaceholder: {
		float: 'left',
		marginRight: '10px',
		width: '121px',
		height: '90px',
	},
};
