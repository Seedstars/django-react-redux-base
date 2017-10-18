import React from 'react';
import { Route, Switch } from 'react-router';
import { HomeView, LoginView, RegisterView, ProtectedView, NotFoundView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/protected" component={requireAuthentication(ProtectedView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
