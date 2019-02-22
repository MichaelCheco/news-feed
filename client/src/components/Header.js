import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import { withRouter } from 'react-router';
import styled from 'styled-components';
/* darkBlue: '#004466',
	mediumBlue: '#036699',
	lightBlue: '#99CBCC',
	lightGrey: '#E4E5E6',
	red */
const Div = styled.div`
	width: 100%;
	@media (min-width: 375px) {
		i {
			color: red;
		}
		a {
			color: red;
		}
	}
`;
class Header extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);
		return (
			<Div>
				<div>
					<Link to="/new/1">
						<i class="fas fa-newspaper" /> Feed
					</Link>
					<Link to="/search">
						<i class="fas fa-search" /> Search{' '}
					</Link>
					<a href="https://www.lambdaschoolshop.com/">
						<i class="fas fa-store" /> Store
					</a>
					{authToken && (
						<Link to="/create">
							<i class="far fa-plus-square" /> Create
						</Link>
					)}
				</div>
			</Div>
		);
	}
}

export default withRouter(Header);
