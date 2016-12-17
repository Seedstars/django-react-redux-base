import { createReducer } from '../utils';
import {
    DATA_FETCH_PROTECTED_DATA_REQUEST,
    DATA_RECEIVE_PROTECTED_DATA,
    DATA_FETCH_ASYNC_TASK,
    DATA_RECEIVE_ASYNC_TASK,
    DATA_RECEIVE_ASYNC_TASK_ERROR
} from '../constants';

const initialState = {
    data: null,
    isFetching: false,
    asyncTask: {
        error: null
    }
};

export default createReducer(initialState, {
    [DATA_RECEIVE_PROTECTED_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            data: payload.data,
            isFetching: false
        });
    },
    [DATA_FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [DATA_FETCH_ASYNC_TASK]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [DATA_RECEIVE_ASYNC_TASK]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false
        });
    },
    [DATA_RECEIVE_ASYNC_TASK_ERROR]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            asyncTask: { error: payload }
        });
    }
});
