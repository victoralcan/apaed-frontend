import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import Login from './pages/login';
import Home from './pages/home';

function Routes() {
  return (
    <Switch>
      <ErrorBoundaryRoute exact path="/" component={Login} />
      <ErrorBoundaryRoute path="/home" component={Home} />
      <ErrorBoundaryRoute path="/" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
