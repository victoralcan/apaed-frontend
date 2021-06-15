import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import Estoque from './estoque';
import Fornecedor from './fornecedor';

const Routes = () => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path="/estoque" component={Estoque} />
      <ErrorBoundaryRoute path="/fornecedor" component={Fornecedor} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
