import React from 'react';
import { shallow } from 'enzyme';

import AdDetails from './AdDetails';
import Spinner from './Spinner';

const mockAd = {
	category_info: {},
	location_info: {},
};

it("renders a spinner when the ad is loading", () => {
	const deets = shallow(<AdDetails loading />);

	expect(deets.find(Spinner).length).toEqual(1);
});

it("renders an error message when the ad failed to load", () => {
	const mockError = "test";
	const deets = shallow(<AdDetails error={mockError} />);

	expect(deets.find('[data-test="ad-details-error"]').text()).toEqual(expect.stringContaining(mockError));
});

it("renders ad details when the ad is loaded", () => {
	const deets = shallow(<AdDetails ad={mockAd} />);

	expect(deets.find('[data-test="ad-details-header"]').length).toEqual(1);
});