import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import ads from './reducers/ads';

const middlewares = [thunkMiddleware];

let composeEnhancers = compose;

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Tutti Homework' })
	: compose;

export default createStore(ads, composeEnhancers(applyMiddleware(...middlewares)));
