import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import FornecedorAdmin from './fornecedor';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={<div>Estoque admin</div>} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={FornecedorAdmin} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
