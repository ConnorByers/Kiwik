import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './harbor/css/bootstrap4-harbor.min.css';
import {Route,Switch, BrowserRouter} from 'react-router-dom';
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
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
