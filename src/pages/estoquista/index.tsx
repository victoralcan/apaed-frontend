import React from 'react';

import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';

import { Switch } from 'react-router-dom';
import PageNotFound from '../../shared/error/page-not-found';
import Estoque from './estoque';
import Fornecedor from './fornecedor';
import Setor from './setor';
import AdicionarFornecedor from './adicionarFornecedor';
import VerFornecedor from './verFornecedor';
import VerSetor from './verSetor';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute path={`${match.url}/estoque`} component={Estoque} />
    <ErrorBoundaryRoute path={`${match.url}/fornecedor`} component={Fornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/setor`} component={Setor} />
    <ErrorBoundaryRoute path={`${match.url}/adicionarFornecedor`} component={AdicionarFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/verFornecedor`} component={VerFornecedor} />
    <ErrorBoundaryRoute path={`${match.url}/verSetor`} component={VerSetor} />
    <ErrorBoundaryRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
