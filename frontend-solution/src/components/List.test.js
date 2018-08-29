import React from 'react';
import { shallow } from 'enzyme';

import {List} from './List';
import Spinner from './Spinner';
import ListItem from './ListItem';

const mockFetchList = jest.fn();

const mockAds = [];
let nextId = 1;
const adsNum = Math.floor(Math.random() * 100) + 1;

for (let i = 0; i < adsNum; i++) {
	mockAds.push({id: nextId++});
}

afterEach(() => {
	mockFetchList.mockClear();
});

it("renders a spinner when loading is true and there's no data", () => {
	const list = shallow(<List loading fetchList={mockFetchList} />);
	expect(list.find(Spinner).length).toEqual(1);
	expect(list.find('[data-test="load_more"]').length).toEqual(0);
	expect(mockFetchList.mock.calls.length).toEqual(0);
});

it("renders the list items when there is data", () => {
	const list = shallow(<List fetchList={mockFetchList} ads={mockAds} />);
	expect(list.find(ListItem).length).toEqual(mockAds.length);
	expect(list.find(Spinner).length).toEqual(0);
	expect(list.find('[data-test="load_more"]').length).toEqual(0);
	expect(mockFetchList.mock.calls.length).toEqual(0);
});

it("renders a next page button when there is data and a next page and calls fetchList when it's clicked", () => {
	const list = shallow(<List fetchList={mockFetchList} ads={mockAds} nextPage={2} />);
	expect(list.find(ListItem).length).toEqual(mockAds.length);
	expect(list.find(Spinner).length).toEqual(0);
	expect(mockFetchList.mock.calls.length).toEqual(0);

	const loadMore = list.find('[data-test="load_more"]')
	expect(loadMore.length).toEqual(1);
	loadMore.simulate('click');
	expect(mockFetchList.mock.calls.length).toEqual(1);
});

it("renders the list items and a small spinner at the bottom when loading next page", () => {
	const list = shallow(<List fetchList={mockFetchList} ads={mockAds} loading />);
	expect(list.find(ListItem).length).toEqual(mockAds.length);
	expect(list.find(Spinner).length).toEqual(1);
	expect(list.find('[data-test="load_more"]').length).toEqual(0);
	expect(mockFetchList.mock.calls.length).toEqual(0);
});

it("calls fetchList when there is no data and is not loading", () => {
	const list = shallow(<List fetchList={mockFetchList} />);
	expect(list.find(ListItem).length).toEqual(0);
	expect(list.find(Spinner).length).toEqual(0);
	expect(list.find('[data-test="load_more"]').length).toEqual(0);
	expect(mockFetchList.mock.calls.length).toEqual(1);
});