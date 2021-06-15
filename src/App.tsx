import React from 'react';
import { Router } from 'react-router';
import Routes from './routes';
import history from './config/history';
import Header from './shared/components/header/header';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
