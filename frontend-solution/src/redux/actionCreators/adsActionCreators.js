import truncate from 'truncate';

import get from '../get';
import actionTypes from '../constants/actionTypes';


const baseUrl = process.env.NODE_ENV === 'production' ? 'https://tutti.tiaservices.space/api' : '';

function formatItem(item) {
	return {
		...item,
		body: truncate(item.body, 80),
		time: item.epoch_time
	};
}

function formatGalleryItem(item) {
	item.gallery = true;

	return formatItem(item);
}

export function requestList() {
	return {
		type: actionTypes.REQUEST_LIST,
	};
}

export function receivedList(nextPage, data) {
	data.items.forEach(ad => {
		if (ad.type !== 's' && ad.type !== 'u' && ad.type !== 'k') {
			console.log(ad);
		}
	});
	return {
		type: actionTypes.RECEIVED_LIST,
		nextPage,
		list: [...data.gallery_items.map(formatGalleryItem), ...data.items.map(formatItem)],
	};
}

export function listError(error) {
	return {
		type: actionTypes.LIST_ERROR,
		error,
	};
}

export function fetchList(page = 1) {
	return get({
		url: `${baseUrl}/list.json`,
		params: {o: page},
		requestAction: requestList,
		successAction: receivedList.bind(null, page + 1),
		errorAction: listError,
	});
}

export function requestAd() {
	return {
		type: actionTypes.REQUEST_AD,
	};
}

export function receivedAd(ad) {
	return {
		type: actionTypes.RECEIVED_AD,
		ad,
	};
}

export function adError(error) {
	return {
		type: actionTypes.AD_ERROR,
		error,
	};
}

export function fetchAd(id) {
	return get({
		url: `${baseUrl}/item/view.json`,
		params: {item_id: id},
		requestAction: requestAd,
		successAction: receivedAd,
		errorAction: adError,
	});
}

export function clearCurrentAd() {
	return {
		type: actionTypes.CLEAR_CURRENT_AD,
	};
}