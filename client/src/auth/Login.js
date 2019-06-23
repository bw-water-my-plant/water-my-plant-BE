import React from 'react';
import axios from 'axios';

import './login.css';

export default class Login extends React.Component {
  state = {
    username: 'sam',
    password: 'pass',
  };

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }

  handleInputChange = event => {
    const { id, value } = event.target;

    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:5000/api/login';
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log('RESPONSE', res.data);
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      })
      .catch(error => {
        console.error('ERROR', error);
      });
  };
}
