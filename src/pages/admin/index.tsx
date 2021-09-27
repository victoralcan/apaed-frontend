import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import FornecedorAdm from './fornecedorAdm';
import SetorAdm from './setorAdm';
import AdicionarSetor from './adicionarSetor';
import Estoque from 'pages/estoquista/estoque';
import addFornecedor from 'pages/admin/addFornecedor';
import verSetor from 'pages/estoquista/verSetor';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={Estoque} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={FornecedorAdm} />
    <ErrorBoundaryRoute path={`${match.url}/addFornecedor`} component={addFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/setor`} component={SetorAdm} />
    <ErrorBoundaryRoute path={`${match.url}/verSetor`} component={verSetor} />
    <ErrorBoundaryRoute path={`${match.url}/adicionarSetor`} component={AdicionarSetor} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
