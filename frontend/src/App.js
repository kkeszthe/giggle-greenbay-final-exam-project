import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Products from './components/products/Products';
import Product from './components/products/Product';

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

            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/products/:productId" exact>
              <Product />
            </Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
