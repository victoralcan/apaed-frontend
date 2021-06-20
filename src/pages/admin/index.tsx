import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import FornecedorAdm from './fornecedorAdm';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={<div>Estoque admin</div>} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedorAdm`} component={FornecedorAdm} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
