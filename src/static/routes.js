import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import { HomeView, LoginView, ProtectedView, NotFoundView } from './containers';
import { requireAuthentication } from './components/AuthenticatedComponent';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
        <Route path="*" component={NotFoundView}/>
    </Route>
);
