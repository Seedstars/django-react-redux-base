const initialState = {
    data: null,
    isFetching: false
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case 'DATA_RECEIVE_PROTECTED_DATA':
            return Object.assign({}, state, {
                data: action.payload.data,
                isFetching: false
            });

        case 'DATA_FETCH_PROTECTED_DATA_REQUEST':
            return Object.assign({}, state, {
                isFetching: true
            });

        default:
            return state;
    }
}

