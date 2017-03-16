/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import dataReducer from '../../../src/static/reducers/data';
import * as TYPES from '../../../src/static/constants';

describe('Data Reducers Tests', () => {
    it('should handle RECEIVE_PROTECTED_DATA', () => {
        const reducerResponse = dataReducer([], {
            type: TYPES.DATA_RECEIVE_PROTECTED_DATA,
            payload: {
                data: 'this is some data'
            }
        });
        expect(reducerResponse).to.eql({
            data: 'this is some data',
            isFetching: false
        });
    });

    it('should handle FETCH_PROTECTED_DATA_REQUEST', () => {
        const reducerResponse = dataReducer([], {
            type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
        });
        expect(reducerResponse).to.eql({
            isFetching: true
        });
    });

    it('should handle DATA_FETCH_ASYNC_TASK', () => {
        const reducerResponse = dataReducer([], {
            type: TYPES.DATA_FETCH_ASYNC_TASK
        });
        expect(reducerResponse).to.eql({
            isFetching: true
        });
    });

    it('should handle DATA_RECEIVE_ASYNC_TASK', () => {
        const reducerResponse = dataReducer([], {
            type: TYPES.DATA_RECEIVE_ASYNC_TASK
        });
        expect(reducerResponse).to.eql({
            isFetching: false
        });
    });

    it('should handle DATA_RECEIVE_ASYNC_TASK_ERROR', () => {
        const reducerResponse = dataReducer([], {
            type: TYPES.DATA_RECEIVE_ASYNC_TASK_ERROR,
            payload: {
                status: 500,
                statusText: 'some error'

            }
        });
        expect(reducerResponse).to.eql({
            isFetching: false,
            asyncTask: {
                error: {
                    status: 500,
                    statusText: 'some error'
                }
            }
        });
    });
});
