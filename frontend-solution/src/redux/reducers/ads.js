import actionTypes from '../constants/actionTypes';

const initialState = {
	list: null,
	listLoading: false,
	listError: null,
	nextPage: 1,
	current: null,
	currentLoading: false,
	currentError: null,
	firstPageLength: null,
};

export default function ads(state = initialState, action) {
	switch (action.type) {
		case actionTypes.REQUEST_LIST:
			return {
				...state,
				listError: null,
				listLoading: true,
			};
		case actionTypes.RECEIVED_LIST:
			return {
				...state,
				list: state.list ? [...state.list, ...action.list] : action.list,
				listLoading: false,
				nextPage: action.nextPage,
				firstPageLength: state.nextPage === 1 ? action.list.length : state.firstPageLength,
			};
		case actionTypes.LIST_ERROR:
			return {
				...state,
				listError: action.error,
				listLoading: false,
			};
		case actionTypes.REQUEST_AD:
			return {
				...state,
				currentError: null,
				currentLoading: true,
			};
		case actionTypes.RECEIVED_AD:
			if (!state.currentLoading) {
				return state;
			}

			return {
				...state,
				current: action.ad,
				currentLoading: false,
			};
		case actionTypes.AD_ERROR:
			return {
				...state,
				currentError: action.error,
				currentLoading: false,
			};
		case actionTypes.CLEAR_CURRENT_AD:
			return {
				...state,
				current: initialState.current,
				currentError: initialState.currentError,
				currentLoading: false,
			};
		default:
			return state;
	}
}
