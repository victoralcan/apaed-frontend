import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import FornecedorAdm from './fornecedorAdm';
import SetorAdm from './setorAdm';
import AdicionarSetor from './adicionarSetor';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={() => <div>Estoque admin</div>} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={FornecedorAdm} />
    <ErrorBoundaryRoute path={`${match.url}/setor`} component={SetorAdm} />
    <ErrorBoundaryRoute path={`${match.url}/adicionarSetor`} component={AdicionarSetor} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
