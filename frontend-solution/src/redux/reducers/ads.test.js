import ads from './ads';
import * as actionCreators from '../actionCreators/adsActionCreators';

const initialState = ads(undefined, {type: 'TEST'});

const mockError = 'test error';

describe('ad list', () => {
	it('clears last error and sets loading flag on REQUEST_LIST', () => {
		const action = actionCreators.requestList();
		const state = ads(initialState, action);

		expect(state).toHaveProperty('listError', initialState.listError);
		expect(state).toHaveProperty('listLoading', true);
	});

	it('sets received data and clears loading flag on RECEIVED_LIST', () => {
		const mockObj = {items: [{type: 'k'}, {type: 'k'}, {type: 'k'}], gallery_items: [{type: 'k'}, {type: 'k'}]};
		const pageNum = 8;

		const action = actionCreators.receivedList(pageNum, mockObj);
		const state = ads(initialState, action);


		expect(state.list).toHaveLength(mockObj.items.length + mockObj.gallery_items.length);
		expect(state).toHaveProperty('listLoading', false);
		expect(state).toHaveProperty('nextPage', pageNum);
	});

	it('sets the error message and clears the loading flag on LIST_ERROR', () => {
		const action = actionCreators.listError(mockError);
		const state = ads(initialState, action);

		expect(state).toHaveProperty('listError', mockError);
		expect(state).toHaveProperty('listLoading', false);
	});	
});

describe('single ad', () => {
	it('clears last error and sets loading flag on REQUEST_AD', () => {
		const action = actionCreators.requestAd();
		const state = ads(initialState, action);

		expect(state).toHaveProperty('currentError', initialState.currentError);
		expect(state).toHaveProperty('currentLoading', true);
	});

	it('sets received data and clears loading flag on RECEIVED_AD', () => {
		const mockObj = {};

		const loadingState = {
			...initialState,
			currentLoading: true,
		};

		const action = actionCreators.receivedAd(mockObj);
		const state = ads(loadingState, action);


		expect(state).toHaveProperty('current', mockObj);
		expect(state).toHaveProperty('currentLoading', false);
	});

	it('sets the error message and clears the loading flag on AD_ERROR', () => {
		const action = actionCreators.adError(mockError);
		const state = ads(initialState, action);

		expect(state).toHaveProperty('currentError', mockError);
		expect(state).toHaveProperty('currentLoading', false);
	});

	it('clears all single ad data state on CLEAR_CURRENT_AD', () => {
		const action = actionCreators.clearCurrentAd();
		const state = ads(initialState, action);

		expect(state).toHaveProperty('currentError', initialState.currentError);
		expect(state).toHaveProperty('currentLoading', false);
		expect(state).toHaveProperty('current', initialState.current);
	});
});
