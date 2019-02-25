import React from 'react';
import styled from 'styled-components';
const Button = styled.button`
	@media (min-width: 375px) {
		border: 1px solid ${props => props.theme.mediumBlue};
		width: 80px;
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
		a {
			font-size: 1.3rem;
			white-space: nowrap;
			color: white;
		}
	}
`;
const Wrapper = styled.div`
	text-align: center;
`;
const Contact = () => {
	return (
		<Wrapper>
			<h1>Questions? Reach Out.</h1>
			<Button>
				<a href="mailto:contact@lambdaschool.com">Email Us</a>
			</Button>
		</Wrapper>
	);
};

export default Contact;
