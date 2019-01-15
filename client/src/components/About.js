import React from "react";
import styled, { keyframes } from "styled-components";

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
const Wrapper = styled.div``;
const easeInLeft = keyframes`
    from {
        margin-left: 100%;

    }
    to {
        margin-left: 10px;
    }
`;
const Button = styled.button`
  width: 200px;
  background: ${props => props.theme.red};
  height: 50px;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  :focus {
    outline: 0;
  }
  a{

  :hover {
      text-decoration: underline;
  }
  }
`;
const easeInRight = keyframes`
        from {
            margin-right: 100%;
    
        }
        to {
            margin-right: 10px;
        }

`;
const H2Left = styled.h2`
  animation: 2s ${easeInLeft} linear;
  height: 45px;
  white-space: nowrap;
  font-size: 34px;
  font-family: "Thasadith", sans-serif;
`;
const H2Right = styled.h2`
  animation: 2s ${easeInRight} linear;
  height: 45px;
  font-size: 34px;
  font-family: "Thasadith", sans-serif;
  white-space: nowrap;
`;
const HowDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const P = styled.p`
  width: 95%;
  font-family: "Thasadith", sans-serif;
  font-size: 18px;
`;
const TuitionDiv = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PLearn = styled.p`
  font-family: "Thasadith", sans-serif;
  font-size: 24px;
`;
const About = () => {
  return (
    <Container>
      <HowDiv>
        <H2Left>How it Works</H2Left>
        <P>
          Lambda School trains people online to be software engineers at no
          up-front cost. Instead of paying tuition, students can agree to pay a
          percentage of their income after they're employed, and only if they're
          making more than $50k per year. If you don't find a job, or don't
          reach that level of income, you'll never pay a cent.
        </P>
      </HowDiv>
      <TuitionDiv>
        <H2Right>How Tuition Works</H2Right>
        <P>
          There are no up-front costs required to attend Lambda School; we only
          get paid when you do. Once you’re earning at least $50k per year
          you’ll pay back 17% of your income for the first two years. Total
          tuition possible is capped at a maximum of $30k, so no matter how much
          you’re getting paid the most you could possibly pay is $30k.
          Alternatively, you may opt to pay a tuition of $20k up-front with no
          income-based repayment.{" "}
        </P>
        <PLearn> Learn More About How Lambda Works here</PLearn>
        <Button>
           <a href="https://lambdaschool.com/about/">Learn More</a>
            </Button>
      </TuitionDiv>
    </Container>
  );
};

export default About;
