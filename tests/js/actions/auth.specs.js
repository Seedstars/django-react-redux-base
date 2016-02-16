import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as TYPES from '../../../src/static/constants';
import * as ACTIONS_AUTH from '../../../src/static/actions/auth';

import { SERVER_URL } from '../../../src/static/utils/config';


describe('Auth Actions:', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    beforeEach(() => {
        localStorage.removeItem('token');
    });

    it('authLoginUserSuccess should create LOGIN_USER_SUCCESS action', () => {
        expect(ACTIONS_AUTH.authLoginUserSuccess('token')).to.eql({
            type: TYPES.AUTH_LOGIN_USER_SUCCESS, payload: {
                token: 'token'
            }
        });
    });

    it('authLoginUserFailure should create LOGIN_USER_FAILURE action', () => {
        expect(ACTIONS_AUTH.authLoginUserFailure({
            response: {
                status: '404',
                statusText: 'Not found'
            }
        })).to.eql({
            type: TYPES.AUTH_LOGIN_USER_FAILURE, payload: {
                status: '404',
                statusText: 'Not found'
            }
        });
    });

    it('authLoginUserRequest should create LOGIN_USER_REQUEST action', () => {
        expect(ACTIONS_AUTH.authLoginUserRequest()).to.eql({
            type: TYPES.AUTH_LOGIN_USER_REQUEST
        });
    });

    it('authLogout should create LOGOUT_USER action', () => {
        expect(ACTIONS_AUTH.authLogout()).to.eql({
            type: TYPES.AUTH_LOGOUT_USER
        });
    });

    it('authLogoutAndRedirect should create authLogout and pushState actions', (done) => {
        const expectedActions = [
            {
                type: TYPES.AUTH_LOGOUT_USER
            }, {
                type: '@@router/TRANSITION',
                payload: {
                    method: 'push',
                    args: [
                        '/login'
                    ]
                }
            }
        ];

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({}, expectedActions, done);

        store.dispatch(ACTIONS_AUTH.authLogoutAndRedirect());
    });

    it('authLoginUser should create LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, ' +
        'and PUSH_STATE actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.AUTH_LOGIN_USER_REQUEST
            }, {
                type: TYPES.AUTH_LOGIN_USER_SUCCESS,
                payload: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85' +
                    'zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'
                }
            }, {
                type: '@@router/TRANSITION',
                payload: {
                    method: 'push',
                    args: [
                        '/'
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/accounts/login/')
            .reply(200, {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9Mk' +
                'xBHroZ9ZPZEES-IKeul9ozxYnoZ8'
            });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({}, expectedActions, done);

        store.dispatch(ACTIONS_AUTH.authLoginUser());
    });

    it('authLoginUser should create LOGIN_USER_REQUEST and LOGIN_USER_FAILURE actions when API returns 401', (done) => {
        const expectedActions = [
            {
                type: TYPES.AUTH_LOGIN_USER_REQUEST
            }, {
                type: TYPES.AUTH_LOGIN_USER_FAILURE,
                payload: {
                    status: 401,
                    statusText: 'Unauthorized'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/accounts/login/')
            .reply(401);

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({}, expectedActions, done);

        store.dispatch(ACTIONS_AUTH.authLoginUser());
    });

    it('authLoginUser should create LOGIN_USER_REQUEST and LOGIN_USER_FAILURE ' +
        'actions when the token is invalid', (done) => {
        const expectedActions = [
            {
                type: TYPES.AUTH_LOGIN_USER_REQUEST
            }, {
                type: TYPES.AUTH_LOGIN_USER_FAILURE,
                payload: {
                    status: 403,
                    statusText: 'Invalid token'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/accounts/login/')
            .reply(200, {
                token: null
            });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({}, expectedActions, done);

        store.dispatch(ACTIONS_AUTH.authLoginUser());
    });
});
