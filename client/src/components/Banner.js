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
	@media (min-width: 375px) {
		border: 3px solid blue;
	}
`;
const LogoWrapper = styled.div`
	border: 3px solid green;
	display: flex;
	justify-content: center;
	padding: 10px;
`;
const LogoStylesL = styled.div`
	width: 14%;
	margin: 5px 0;
	text-align: center;
	font-size: 2.3rem;
	font-weight: bold;
	background: ${props => props.theme.mediumBlue};
	color: white;
	padding: 5px;
`;
const LogoStylesS = styled.div`
	width: 14%;
	margin: 5px 0;
	text-align: center;
	font-size: 2.3rem;
	font-weight: bold;
	background: ${props => props.theme.lightBlue};
	color: white;
	padding: 5px;
`;
const LogoStylesN = styled.div`
	width: 14%;
	margin: 5px 0;
	text-align: center;
	font-size: 2.3rem;
	font-weight: bold;
	background: ${props => props.theme.red};
	color: white;
	padding: 5px;
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
						<button
							onClick={() => {
								this.props.history.push('/login');
							}}>
							<i class="fas fa-sign-in-alt"> Login</i>
						</button>
						<button
							onClick={() => {
								localStorage.removeItem(AUTH_TOKEN);
								this.props.history.push('/login');
							}}>
							<i class="fas fa-sign-out-alt">Logout</i>
						</button>
					</div>
				</div>
			</Div>
		);
	}
}

export default withRouter(Banner);
