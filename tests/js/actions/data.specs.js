/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as TYPES from '../../../src/static/constants';
import * as ACTIONS_DATA from '../../../src/static/actions/data';
import { SERVER_URL } from '../../../src/static/utils/config';


describe('Data Actions:', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    beforeEach(() => {
        localStorage.removeItem('token');
    });

    it('dataReceiveProtectedData should create DATA_RECEIVE_PROTECTED_DATA action', () => {
        expect(ACTIONS_DATA.dataReceiveProtectedData('data')).to.eql({
            type: TYPES.DATA_RECEIVE_PROTECTED_DATA,
            payload: {
                data: 'data'
            }
        });
    });

    it('dataFetchProtectedDataRequest should create FETCH_PROTECTED_DATA_REQUEST action', () => {
        expect(ACTIONS_DATA.dataFetchProtectedDataRequest()).to.eql({
            type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
        });
    });

    it('dataFetchProtectedDataRequest should create DATA_RECEIVE_PROTECTED_DATA actions ' +
        'when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
            }, {
                type: TYPES.DATA_RECEIVE_PROTECTED_DATA,
                payload: {
                    data: 'data'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/base/get_data')
            .reply(200, { data: 'data' });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataFetchProtectedData('token'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('dataFetchProtectedDataRequest should create authLogout and pushState actions when API returns 401', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
            }, {
                type: TYPES.AUTH_LOGIN_USER_FAILURE,
                payload: {
                    status: 401,
                    statusText: 'Unauthorized'
                }
            }, {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: {
                    method: 'push',
                    args: [
                        '/login'
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/base/get_data')
            .reply(401, { non_field_errors: ['Unauthorized'] });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataFetchProtectedData('token'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('dataFetchProtectedDataRequest should create authLogout and pushState actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
            }, {
                type: TYPES.AUTH_LOGIN_USER_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }, {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: {
                    method: 'push',
                    args: [
                        '/login'
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/base/get_data')
            .reply(500);

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataFetchProtectedData('token'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('dataFetchProtectedDataRequest should create authLogout and pushState actions when API ' +
        'has no response', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
            }, {
                type: TYPES.AUTH_LOGIN_USER_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }, {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: {
                    method: 'push',
                    args: [
                        '/login'
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/base/get_data')
            .reply();

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataFetchProtectedData('token'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('dataReceiveAsyncTask should create DATA_RECEIVE_ASYNC_TASK action', () => {
        expect(ACTIONS_DATA.dataReceiveAsyncTask('data')).to.eql({
            type: TYPES.DATA_RECEIVE_ASYNC_TASK
        });
    });

    it('dataFetchAsyncTaskRequest should create DATA_FETCH_ASYNC_TASK action', () => {
        expect(ACTIONS_DATA.dataFetchAsyncTaskRequest()).to.eql({
            type: TYPES.DATA_FETCH_ASYNC_TASK
        });
    });

    it('dataExecuteAsyncTask should create DATA_RECEIVE_ASYNC_TASK actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_ASYNC_TASK
            },
            {
                type: TYPES.DATA_RECEIVE_ASYNC_TASK
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/base/async_task')
            .reply(200, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataExecuteAsyncTask())
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('dataExecuteAsyncTask should create DATA_RECEIVE_ASYNC_TASK_ERROR when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_ASYNC_TASK
            }, {
                type: TYPES.DATA_RECEIVE_ASYNC_TASK_ERROR,
                payload: {
                    status: 500,
                    statusText: 'Internal Server Error'
                }
            }, {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: {
                    method: 'push',
                    args: [
                        '/login'
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/base/async_task')
            .reply(500, { statusText: 'Internal Server Error' });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataExecuteAsyncTask())
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('dataExecuteAsyncTask should create DATA_RECEIVE_ASYNC_TASK_ERROR when API has no response', (done) => {
        const expectedActions = [
            {
                type: TYPES.DATA_FETCH_ASYNC_TASK
            }, {
                type: TYPES.DATA_RECEIVE_ASYNC_TASK_ERROR,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/base/async_task')
            .reply();

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataExecuteAsyncTask())
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });
});
