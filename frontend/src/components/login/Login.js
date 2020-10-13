import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Login.css';
import { loginAction } from '../../actions/LoginAction';
import Error from '../Error';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    login({ username, password }).then(success => {
      if (success) {
        history.push('/products');
      }
    });
  };

  const handleUsername = e => {
    let value = e.target.value;
    setUsername(value);
  };

  const handlePassword = e => {
    let value = e.target.value;
    setPassword(value);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            required
            autoComplete="username"
            placeholder="Username"
            onChange={handleUsername}
          ></input>
        </div>

        <div>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            onChange={handlePassword}
          ></input>
        </div>

        <button type="submit" className="loginButton">
          SIGN IN
        </button>
      </form>
      <Error />
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      return dispatch(loginAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
