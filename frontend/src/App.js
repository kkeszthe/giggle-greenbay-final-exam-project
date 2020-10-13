import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Products from './components/products/Products';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <section className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/products">
              <Products />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
