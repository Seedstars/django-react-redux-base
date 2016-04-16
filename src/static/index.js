import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { authLoginUserSuccess } from './actions/auth';
import { browserHistory } from 'react-router';


const target = document.getElementById('root');

const store = configureStore(window.__INITIAL_STATE__, browserHistory);

const node = (
    <Root store={store} history={browserHistory}/>
);

const token = sessionStorage.getItem('token');
if (token !== null) {
    store.dispatch(authLoginUserSuccess(token));
}

ReactDOM.render(node, target);
