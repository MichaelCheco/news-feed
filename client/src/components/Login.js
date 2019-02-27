import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import styled from 'styled-components';
const Wrapper = styled.div`
	@media (min-width: 375px) {
		display: column;
		margin-top: 1rem;
		width: 100%;
	}
`;
const Button = styled.button`
	@media (min-width: 375px) {
		border: 1px solid ${props => props.theme.mediumBlue};
		width: auto;
		height: 30px;
		border-radius: 5px;
		margin-left: 0.5rem;
		background: ${props => props.theme.mediumBlue};
		/* position: relative;
		top: 70%;
		right: 90%; */

		&:hover {
			cursor: pointer;
			opacity: 0.7;
		}
		outline: 0;
		font-size: 1.3rem;
		white-space: nowrap;
		color: white;
	}
`;
const ButtonWrapper = styled.div`
	@media (min-width: 375px) {
		display: flex;
		justify-content: center;
		margin-right: 1.5rem;
	}
`;
const InputWrapper = styled.div`
	@media (min-width: 375px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1rem;
		input {
			width: 50%;
			outline: 0;
			margin: 0.5rem 0;
			padding: 0.5rem;
		}
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
		email: '',
		name: '',
		password: '',
		login: true,
	};
	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};
	_confirmData = async data => {
		const { token } = this.state.login ? data.login : data.signup;
		this._saveUserData(token);
		this.props.history.push('/');
	};
	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token);
	};

	render() {
		const { email, name, password, login } = this.state;
		return (
			<Wrapper>
				<ButtonWrapper>
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{ email, name, password }}
						onCompleted={data => this._confirmData(data)}>
						{mutation => (
							<Button onClick={mutation}>
								{login ? 'Login' : 'Create Account'}
							</Button>
						)}
					</Mutation>
					<Button onClick={() => this.setState({ login: !login })}>
						{login ? 'Create an account' : 'Already have an account?'}
					</Button>
				</ButtonWrapper>

				<InputWrapper>
					{!login && (
						<input
							autoFocus
							type="text"
							name="name"
							value={name}
							placeholder="Name"
							onChange={this.handleChange}
						/>
					)}
					<input
						required
						type="text"
						name="email"
						value={email}
						placeholder="Email"
						onChange={this.handleChange}
					/>
					<input
						required
						type="password"
						name="password"
						value={password}
						placeholder="Password"
						onChange={this.handleChange}
					/>
				</InputWrapper>
			</Wrapper>
		);
	}
}

export default Login;
