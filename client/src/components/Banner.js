import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';
/* darkBlue: '#004466',
	mediumBlue: '#036699',
	lightBlue: '#99CBCC',
	lightGrey: '#E4E5E6',
	red */
const Div = styled.div`
	width: 100%;

	@media (min-width: 375px) {
		display: flex;
	}
`;
const LogoWrapper = styled.div`
	padding: 10px;
	width: 70%;

	display: flex;
`;
const LogoStylesL = styled.div`
	width: 14%;
	padding: 4px;

	text-align: center;
	font-size: 2.3rem;
	font-weight: bold;
	background: ${props => props.theme.mediumBlue};
	color: white;
`;
const LogoStylesS = styled.div`
	width: 14%;
	padding: 4px;

	text-align: center;
	font-size: 2.3rem;
	font-weight: bold;
	background: ${props => props.theme.lightBlue};
	color: white;
`;
const LogoStylesN = styled.div`
	width: 14%;
	padding: 4px;

	text-align: center;
	font-size: 2.3rem;
	font-weight: bold;
	background: ${props => props.theme.red};
	color: white;
`;
const P = styled.p`
	font-size: 1.5rem;
`;
const AuthWrapper = styled.div`
	@media (min-width: 375px) {
		display: flex;
		p {
			margin: 0.5rem;
			color: grey;
			text-decoration: underline;
		}
	}
`;
class Banner extends Component {
	state = {};
	render() {
		return (
			<Div>
				<LogoWrapper>
					<LogoStylesL>L</LogoStylesL>
					<LogoStylesS>S</LogoStylesS>
					<LogoStylesN>N</LogoStylesN>
				</LogoWrapper>
				<div>
					<div>
						<AuthWrapper>
							<P
								onClick={() => {
									this.props.history.push('/login');
								}}>
								Login
							</P>
							<P
								onClick={() => {
									localStorage.removeItem(AUTH_TOKEN);
									this.props.history.push('/login');
								}}>
								Logout
							</P>
						</AuthWrapper>
					</div>
				</div>
			</Div>
		);
	}
}

export default withRouter(Banner);
