import React from 'react';
import { Router } from 'react-router';
import Routes from './routes';
import history from './config/history';

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
