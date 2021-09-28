import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import FornecedorAdm from '../shared/fornecedor';
import Estoque from 'pages/estoquista/estoque';
import addFornecedor from 'pages/admin/addFornecedor';
import FormSetor from 'pages/shared/formSetor';
import Setor from 'pages/shared/setor';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={Estoque} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={FornecedorAdm} />
    <ErrorBoundaryRoute path={`${match.url}/addFornecedor`} component={addFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/viewFornecedor`} component={addFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/setor`} component={Setor} />
    <ErrorBoundaryRoute path={`${match.url}/viewSetor`} component={FormSetor} />
    <ErrorBoundaryRoute path={`${match.url}/addSetor`} component={FormSetor} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
