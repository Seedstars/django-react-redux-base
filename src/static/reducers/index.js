import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';

export default combineReducers({
    auth,
    data,
    routing: routeReducer
});
