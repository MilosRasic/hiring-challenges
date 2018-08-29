import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import * as cantons from '../lib/tutti-ch-styleguide/Icons/assets/canton';
import * as categories from '../lib/tutti-ch-styleguide/Icons/assets/category';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Spinner from './Spinner';

const sliderSettings = {
	infinite: true,
	dots: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	className: 'slick-test',
};

const iconSize = 35;

export default function AdDetails(props) {
	if (props.loading) {
		return <Spinner offset="100px" />;
	}
	else if (props.error) {
		return <p data-test="ad-details-error"><strong>Error:</strong> {props.error}</p>;
	}
	else if (props.ad) {
		const Canton = cantons[`Canton${props.ad.location_info.region_name.replace('ü', 'u').replace('â', 'a')}`];

		let parentCategory = props.ad.category_info.parent_name.replace('ä', 'a').replace('ü', 'ue').toLowerCase();
		parentCategory = parentCategory.charAt(0).toUpperCase() + parentCategory.substr(1);
		const whitespacePos = parentCategory.indexOf(' ')
		const Category = categories[whitespacePos > 0 ? parentCategory.substring(0, whitespacePos) : parentCategory];

		return (
			<React.Fragment>
				<div data-test="ad-details-header" style={styles.header}>
					<h2 style={styles.left}>{Category ? <Category height={iconSize} width={iconSize} style={{verticalAlign: 'middle'}} /> : `${parentCategory} »`} <span>{props.ad.category_info.name}</span></h2>
					<h3 style={styles.right}>{Canton ? <Canton height={iconSize} width={iconSize} style={{verticalAlign: 'middle'}} /> : props.ad.location_info.region_name}</h3>
					<h1 style={styles.middle}>{props.ad.subject}</h1>
				</div>
				<div style={styles.content}>
					<p style={styles.body}>{props.ad.body}</p>
					{props.ad.image_names &&
						<Slider settings={sliderSettings}>
							{props.ad.image_names.map(image => <div style={styles.imageWrapper} key={`${image}-div`}><img style={styles.image} src={`https://c.tutti.ch/images/${image}`} key={image} alt={image} /></div>)}
						</Slider>
					}
				</div>
				<h3 style={{...styles.footer, backgroundColor: backgroundColors[props.ad.type]}}>{props.ad.price}</h3>
			</React.Fragment>
		);
	}
	else {
		return <Spinner />;
	}
}

AdDetails.displayName = 'AdDetails';

AdDetails.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.string,
	ad: PropTypes.object,
};

const styles = {
	header: {
		height: '50px',
		paddingLeft: '50px',
		paddingTop: '10px',
		backgroundColor: '#d9d9d9',
		color: '#333',
	},
	left: {
		float: 'left',
		marginTop: 0,
		lineHeight: '50px',
		paddingLeft: '20px',
	},
	right: {
		float: 'right',
		marginTop: 0,
		lineHeight: '50px',
		paddingRight: '20px',
	},
	middle: {
		overflow: 'hidden',
		marginTop: 0,
		lineHeight: '50px',
	},
	body: {
		textAlign: 'left',
		padding: '0 20px',
		whiteSpace: 'pre-wrap',
		float: 'left',
		width: '50%',
	},
	carousel: {
		float: 'right',
		//clear: 'both',
	},
	content: {
		clear: 'both',
	},
	footer: {
		height: '50px',
		lineHeight: '50px',
		//clear: 'both',
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		marginBottom: 0,
	},
	imageWrapper: {
		textAlign: 'center',
	},
	image: {
		display: 'inline-block',
	},
};

const backgroundColors = {
	s: '#cceaf9',
	u: '#a8da99',
	K: '#a8da99',
};