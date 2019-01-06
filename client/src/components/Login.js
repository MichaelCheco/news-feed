import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTH_TOKEN } from "../constants";
import styled from "styled-components";
const Container = styled.div`
  display: grid;
  overflow: scroll;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  margin-top: 30px;
  background: white;
  border: 1px solid grey;
  border-radius: 3px;
`;
const EmailInput = styled.input`
  width: 400px;
  height: 60px;
  border: 3px solid ${props => props.theme.darkBlue};
  border-radius: 4px;
  font-size: 36px;
  margin-bottom: 10px;
  :focus {
    outline: 0;
  }
`;
const PasswordInput = styled.input`
  width: 400px;
  height: 60px;
  border-radius: 4px;
  border: 3px solid ${props => props.theme.darkBlue};
  font-size: 36px;
  margin-bottom: 10px;
  :focus {
    outline: 0;
  }
`;
const NameInput = styled.input`
  width: 400px;
  height: 60px;
  border-radius: 4px;
  border: 3px solid ${props => props.theme.darkBlue};
  font-size: 36px;
  margin-bottom: 10px;
  :focus {
    outline: 0;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 680px;
  justify-content: flex-start;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  margin-top: 10px;
`;
const LoginButton = styled.button`
  width: 135px;
  height: 45px;
  padding: 4px;
  font-size: 14px;
  font-weight: bold;
  background: ${props => props.theme.darkBlue};
  border: 3px solid ${props => props.theme.darkBlue};
  color: whitesmoke;
  border-radius: 10px;
  margin-right: 10px;
  :focus {
    outline: 0;
  }
  :hover {
    color: ${props => props.theme.darkBlue};
    cursor: pointer;
    background: whitesmoke;
  }
`;
const CreateButton = styled.button`
  width: 135px;
  height: 45px;
  padding: 4px;
  font-size: 14px;
  font-weight: bold;
  background: ${props => props.theme.darkBlue};
  border: 3px solid ${props => props.theme.darkBlue};
  color: whitesmoke;
  border-radius: 10px;
  margin-right: 10px;
  :focus {
    outline: 0;
  }
  :hover {
    color: ${props => props.theme.darkBlue};
    cursor: pointer;
    background: whitesmoke;
  }
`;
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
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push("/");
  };
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    const { email, name, password, login } = this.state;
    return (
      <Container>
        <ButtonsWrapper>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, name, password }}
            onCompleted={data => this._confirmData(data)}
          >
            {mutation => (
              <LoginButton onClick={mutation}>
                {login ? "Login" : "Create Account"}
              </LoginButton>
            )}
          </Mutation>
          <CreateButton onClick={() => this.setState({ login: !login })}>
            {login ? "Create an account" : "Already have an account?"}
          </CreateButton>
        </ButtonsWrapper>

        <InputWrapper>
          {!login && (
            <NameInput
              autoFocus
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
            />
          )}
          <EmailInput
            autoFocus
            required
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <PasswordInput
            required
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
        </InputWrapper>
      </Container>
    );
  }
}

export default Login;
