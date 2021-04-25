import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Route, Switch, Router } from 'react-router-dom';
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import './style.css';
import history from './history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
