import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    DATA_FETCH_PROTECTED_DATA_REQUEST,
    DATA_RECEIVE_PROTECTED_DATA,
    DATA_FETCH_ASYNC_TASK,
    DATA_RECEIVE_ASYNC_TASK,
    DATA_RECEIVE_ASYNC_TASK_ERROR
} from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchProtectedDataRequest() {
    return {
        type: DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}

export function dataFetchAsyncTaskRequest() {
    return {
        type: DATA_FETCH_ASYNC_TASK
    };
}

export function dataReceiveAsyncTask() {
    return {
        type: DATA_RECEIVE_ASYNC_TASK
    };
}

export function dataReceiveAsyncTaskError(status, statusText) {
    return {
        type: DATA_RECEIVE_ASYNC_TASK_ERROR,
        payload: {
            status,
            statusText
        }
    };
}

export function dataFetchProtectedData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchProtectedDataRequest());
        return fetch(`${SERVER_URL}/api/v1/base/get_data`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                        dispatch(push('/login'));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function dataExecuteAsyncTask() {
    return (dispatch, state) => {
        dispatch(dataFetchAsyncTaskRequest());
        return fetch(`${SERVER_URL}/api/v1/base/async_task`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveAsyncTask());
                alert(  // eslint-disable-line no-alert
                    'An asynchronous task was executed in the worker container. Look into the docker console for it :)'
                );
            })
            .catch((error) => {
                if (error && error.response) {
                    dispatch(dataReceiveAsyncTaskError(error.response.status, error.response.statusText));
                } else {
                    dispatch(dataReceiveAsyncTaskError(
                        'Connection Error', 'An error occurred while sending your data!'));
                }
            });
    };
}
