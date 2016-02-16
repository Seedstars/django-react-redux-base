import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { authLoginUserSuccess } from './actions/auth';
import { hashHistory } from 'react-router';


const target = document.getElementById('root');

const store = configureStore(window.__INITIAL_STATE__, hashHistory);

const node = (
    <Root store={store} history={hashHistory}/>
);

const token = sessionStorage.getItem('token');
if (token !== null) {
    store.dispatch(authLoginUserSuccess(token));
}

ReactDOM.render(node, target);
