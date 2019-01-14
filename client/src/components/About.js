import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  overflow: hidden;
  margin-top: 55px;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 3px;
`;

const About = () => {
    return ( 
        <Container>
        How it Works
Lambda School trains people online to be software engineers at no up-front cost.
Instead of paying tuition, students can agree to pay a percentage of their income after they're employed, and only if they're making more than $50k per year.
If you don't find a job, or don't reach that level of income, you'll never pay a cent.
        </Container>
     );
}
 
export default About;