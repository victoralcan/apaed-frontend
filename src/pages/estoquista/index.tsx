import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import Estoque from './estoque';
import Fornecedor from '../shared/fornecedor';
import Setor from '../shared/setor';
import AddFornecedor from '../shared/formFornecedor';
import VerSetor from '../shared/formSetor';
import Transferir from './transferir';
import EditarProduto from './editarProduto';
import AddProduto from './addProduto';
import AddTipoProduto from '../shared/addTipoProduto';
import AddCategoria from '../shared/addCategoria';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={Estoque} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={Fornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/setor`} component={Setor} />
    <ErrorBoundaryRoute path={`${match.url}/addFornecedor`} component={AddFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/viewFornecedor`} component={AddFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/viewSetor`} component={VerSetor} />
    <ErrorBoundaryRoute path={`${match.url}/transferir`} component={Transferir} />
    <ErrorBoundaryRoute path={`${match.url}/editarProduto`} component={EditarProduto} />
    <ErrorBoundaryRoute path={`${match.url}/addProduto`} component={AddProduto} />
    <ErrorBoundaryRoute path={`${match.url}/addTipoProduto`} component={AddTipoProduto} />
    <ErrorBoundaryRoute path={`${match.url}/addCategoria`} component={AddCategoria} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
