import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import Fornecedor from '../shared/fornecedor';
import Estoque from 'pages/shared/estoque';
import FormFornecedor from 'pages/shared/formFornecedor';
import FormSetor from 'pages/shared/formSetor';
import Setor from 'pages/shared/setor';
import Transferir from '../shared/transferir';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={Estoque} />
    <ErrorBoundaryRoute path={`${match.url}/transferir`} component={Transferir} />
    <ErrorBoundaryRoute path={`${match.url}/addProduto`} component={Estoque} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={Fornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/addFornecedor`} component={FormFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/viewFornecedor`} component={FormFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/setor`} component={Setor} />
    <ErrorBoundaryRoute path={`${match.url}/viewSetor`} component={FormSetor} />
    <ErrorBoundaryRoute path={`${match.url}/addSetor`} component={FormSetor} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
