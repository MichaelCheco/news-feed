import React from 'react';
import styled, { keyframes } from 'styled-components';

const About = () => {
	return (
		<div>
			<div>
				<h2>How it Works</h2>
				<p>
					Lambda School trains people online to be software engineers at no
					up-front cost. Instead of paying tuition, students can agree to pay a
					percentage of their income after they're employed, and only if they're
					making more than $50k per year. If you don't find a job, or don't
					reach that level of income, you'll never pay a cent.
				</p>
			</div>
			<div>
				<h2>How Tuition Works</h2>
				<p>
					There are no up-front costs required to attend Lambda School; we only
					get paid when you do. Once you’re earning at least $50k per year
					you’ll pay back 17% of your income for the first two years. Total
					tuition possible is capped at a maximum of $30k, so no matter how much
					you’re getting paid the most you could possibly pay is $30k.
					Alternatively, you may opt to pay a tuition of $20k up-front with no
					income-based repayment.{' '}
				</p>
				<p> Learn More About How Lambda Works here</p>
				<button>
					<a href="https://lambdaschool.com/about/">Learn More</a>
				</button>
			</div>
		</div>
	);
};

export default About;
