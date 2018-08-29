import axios from 'axios';

export default function({url, params, requestAction, successAction, errorAction}) {
	return dispatch => {
		if (requestAction) {
			dispatch(requestAction(params));
		}

		return axios.get(url, {
			params,
			headers: {
				'X-Tutti-Source': 'Android 3.7.1 (3070010)',
				'X-Tutti-Hash': 'eab89f39-31f5-4c29-b40e-78fc52bc232d',
			},
		}).then(response => {
			if (successAction) {
				dispatch(successAction(response.data));
			}
		}).catch(error => {
			if (errorAction) {
				if (error.response) {
					dispatch(errorAction(typeof error.response.data === 'string' ? error.response.data : error.response.data.message.message, error.response.status));
				}
				else {
					dispatch(errorAction('Network failure'));
				}
			}
		});
	};
}