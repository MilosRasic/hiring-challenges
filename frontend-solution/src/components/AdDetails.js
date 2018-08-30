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
				<div data-test="ad-details-header" className="ad-details-header">
					<h2 className="ad-details-header-segment ad-details-header-left">{Category ? <Category height={iconSize} width={iconSize} className="vertical-align-middle" /> : `${parentCategory} »`} <span>{props.ad.category_info.name}</span></h2>
					<h3 className="ad-details-header-segment ad-details-header-right">{Canton ? <Canton height={iconSize} width={iconSize} className="vertical-align-middle" /> : props.ad.location_info.region_name}</h3>
					<h1 className="ad-details-header-segment ad-details-header-middle">{props.ad.subject}</h1>
				</div>
				<div className="clear-both">
					<p className="ad-details-body">{props.ad.body}</p>
					{props.ad.image_names &&
						<Slider settings={sliderSettings}>
							{props.ad.image_names.map(image => <div className="ad-details-image-wrapper" key={`${image}-div`}><img className="ad-details-image" src={`https://c.tutti.ch/images/${image}`} key={image} alt={image} /></div>)}
						</Slider>
					}
				</div>
				<h3 className={`ad-details-footer category-color-${props.ad.type}`}>{props.ad.price}</h3>
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
