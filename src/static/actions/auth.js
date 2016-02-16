import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { AUTH_LOGIN_USER_REQUEST, AUTH_LOGIN_USER_FAILURE, AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER } from '../constants';


export function authLoginUserSuccess(token) {
    sessionStorage.setItem('token', token);
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token
        }
    };
}

export function authLoginUserFailure(error) {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function authLogout() {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGOUT_USER
    };
}

export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(routeActions.push('/login'));
    };
}

export function authLoginUser(email, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    // Validate if token is valid
                    jwtDecode(response.token);

                    dispatch(authLoginUserSuccess(response.token));
                    dispatch(routeActions.push(redirect));
                } catch (e) {
                    dispatch(authLoginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(authLoginUserFailure(error));
            });
    };
}
