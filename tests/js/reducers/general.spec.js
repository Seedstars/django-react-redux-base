/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import reducer from '../../../src/static/reducers/data';

describe('General Reducers Tests', () => {
    it('the state should be the same when a actions doesnt exist', () => {
        const reducerResponse = reducer(
            {
                data: 'some data',
                isFetching: false
            },
            {
                type: 'this action doesnt exist'
            }
        );
        expect(reducerResponse).to.eql({
            data: 'some data',
            isFetching: false
        });
    });

    it('the state should be the initial state when no state are present', () => {
        const initialState = {
            data: null,
            isFetching: false
        };
        const reducerResponse = reducer(undefined,
            {
                type: 'this action doesnt exist'
            }
        );
        expect(reducerResponse).to.eql(initialState);
    });
});
