import React from 'react';
import styled, { keyframes } from 'styled-components';
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
const Div = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Wrapper = styled.div`
	width: 100%;
	@media (min-width: 375px) {
		padding: 1rem;
	}
`;
const About = () => {
	return (
		<Wrapper>
			<h2>How it Works</h2>
			<p>
				Lambda School trains people online to be software engineers at no
				up-front cost. Instead of paying tuition, students can agree to pay a
				percentage of their income after they're employed, and only if they're
				making more than $50k per year. If you don't find a job, or don't reach
				that level of income, you'll never pay a cent.
			</p>

			<h2>How Tuition Works</h2>
			<p>
				There are no up-front costs required to attend Lambda School; we only
				get paid when you do. Once you’re earning at least $50k per year you’ll
				pay back 17% of your income for the first two years. Total tuition
				possible is capped at a maximum of $30k, so no matter how much you’re
				getting paid the most you could possibly pay is $30k. Alternatively, you
				may opt to pay a tuition of $20k up-front with no income-based
				repayment.{' '}
			</p>
			<Div>
				<p> Learn More About How Lambda Works here</p>
				<Button>
					<a href="https://lambdaschool.com/about/">Learn More</a>
				</Button>
			</Div>
		</Wrapper>
	);
};

export default About;
