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
            .get('/api/v1/getdata/')
            .reply(401);

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataFetchProtectedData('token'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
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
            .get('/api/v1/getdata/')
            .reply(200, {
                data: 'data'
            });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_DATA.dataFetchProtectedData('token'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });
});
