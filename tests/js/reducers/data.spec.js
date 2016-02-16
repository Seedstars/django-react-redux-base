import { expect } from 'chai';
import reducer from '../../../src/static/reducers/data';
import * as TYPES from '../../../src/static/constants';

describe('Data Reducers Tests', () => {
    it('should handle RECEIVE_PROTECTED_DATA', () => {
        const reducerResponse = reducer([],
            {
                type: TYPES.DATA_RECEIVE_PROTECTED_DATA,
                payload: {
                    data: 'this is some data'
                }
            }
        );
        expect(reducerResponse).to.eql({
            data: 'this is some data',
            isFetching: false
        });
    });

    it('should handle FETCH_PROTECTED_DATA_REQUEST', () => {
        const reducerResponse = reducer([],
            {
                type: TYPES.DATA_FETCH_PROTECTED_DATA_REQUEST
            }
        );
        expect(reducerResponse).to.eql({
            isFetching: true
        });
    });
});
