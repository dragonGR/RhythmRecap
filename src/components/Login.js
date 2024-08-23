import React from 'react';
import './styles/Login.css';
import text from '../config/texts';

const Login = ({ handleLogin }) => (
  <div className="login-container">
    <h1 className="login-heading">{text.login.heading}</h1>
    <p className="login-description">{text.login.description}</p>
    <button className="login-button" onClick={handleLogin}>
      {text.login.button}
    </button>
    <a href="https://github.com/dragonGR" className="github-link" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-github"></i>
      </a>
  </div>
);

export default Login;