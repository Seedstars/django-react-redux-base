import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistory } from 'react-router-redux';

import rootReducer from '../reducers';

export default function configureStore(initialState, history) {
    let createStoreWithMiddleware;

    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = syncHistory(history);

    const middleware = applyMiddleware(thunk, reduxRouterMiddleware);

    createStoreWithMiddleware = compose(
        middleware
    );

    return createStoreWithMiddleware(createStore)(rootReducer, initialState);
}
