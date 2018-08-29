import React from 'react';
import {shallow} from 'enzyme';

import {Ad} from './Ad';

const mockFetchAd = jest.fn();
const mockClearCurrentAd = jest.fn();

const mockMatch = {
	params: {
		id: Math.floor(Math.random() * 100) + 1,
	},
};

afterEach(() => {
	mockFetchAd.mockClear();
	mockClearCurrentAd.mockClear();
})

it("calls fetchAd on mount with ID from route params as argument", () => {
	const list = shallow(<Ad match={mockMatch} fetchAd={mockFetchAd} clearCurrentAd={mockClearCurrentAd} />);

	expect(mockFetchAd.mock.calls.length).toEqual(1);
	expect(mockFetchAd.mock.calls[0][0]).toEqual(mockMatch.params.id);
	expect(mockClearCurrentAd.mock.calls.length).toEqual(0);
});

it("calls clearCurrentAd on unmount", () => {
	const list = shallow(<Ad match={mockMatch} fetchAd={mockFetchAd} clearCurrentAd={mockClearCurrentAd} />);

	list.unmount();

	expect(mockFetchAd.mock.calls.length).toEqual(1);
	expect(mockClearCurrentAd.mock.calls.length).toEqual(1);
});