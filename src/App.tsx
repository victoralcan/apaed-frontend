import React from 'react';
import { Router } from 'react-router';
import Routes from './routes';
import history from './config/history';
import Header from './shared/components/header/header';
import Auth from './shared/components/Auth';

function App() {
  return (
    <Auth>
      <Router history={history}>
        <Header />
        <Routes />
      </Router>
    </Auth>
  );
}

export default App;
