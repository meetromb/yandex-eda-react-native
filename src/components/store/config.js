import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../store/reducers';

import { navMiddleware } from '../../Navigation';

let reduxCompose = compose;

if(__DEV__) {
    reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export const store = createStore(rootReducer, reduxCompose(applyMiddleware(promiseMiddleware), applyMiddleware(navMiddleware)))