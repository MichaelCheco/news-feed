import styled from 'styled-components';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';

class Banner extends Component {
	state = {};
	render() {
		return (
			<div>
				<div>
					<div>L</div>
					<div>S</div>
					<div>N</div>
				</div>
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
			</div>
		);
	}
}

export default withRouter(Banner);
