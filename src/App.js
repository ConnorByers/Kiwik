import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import './style.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
