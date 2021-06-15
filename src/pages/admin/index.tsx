import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';

const Routes = () => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path="/estoque" component={<div>Estoque admin</div>} />
      <ErrorBoundaryRoute path="/fornecedor" component={<div>Fornecedor admin</div>} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
