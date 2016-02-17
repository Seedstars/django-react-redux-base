import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import { syncHistory } from 'react-router-redux';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools/DevTools';

export default function configureStore(initialState, history) {
    const logger = createLogger();

    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = syncHistory(history);

    const middleware = applyMiddleware(thunk, logger, reduxRouterMiddleware);

    const createStoreWithMiddleware = compose(
        middleware,
        DevTools.instrument()
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

    // Required for replaying actions from devtools to work
    reduxRouterMiddleware.listenForReplays(store);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}
