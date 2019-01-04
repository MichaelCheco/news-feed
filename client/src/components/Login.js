import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
class Login extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    login: true
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  _confirmData = async data => {
      const { token } = this.state.login ? data.login : data.signup
      this._saveUserData(token)

  }
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { email, name, password, login } = this.state;
    return (
      <div>
        <div>
          {!login && (
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
            />
          )}
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, name, password }}
            onCompleted={data => this._confirmData(data)}
          >
            {mutation => (
              <button onClick={mutation}>
                {login ? "Login" : "Create Account"}
              </button>
            )}
          </Mutation>
        </div>
        <div>
          <button onClick={() => this.setState({ login: !login })}>
            {login ? "Create an account" : "Already have an account?"}
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
