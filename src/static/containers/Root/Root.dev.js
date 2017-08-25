import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../../routes';
import DevTools from './DevTools';

export default class Root extends React.Component {
    static propTypes = {
        store: React.PropTypes.shape().isRequired,
        history: React.PropTypes.shape().isRequired
    };

    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <div>
                        <Router history={this.props.history}>
                            {routes}
                        </Router>
                        <DevTools />
                    </div>
                </Provider>
            </div>
        );
    }
}
