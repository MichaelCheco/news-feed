import React, { Component } from 'react';
import styled from 'styled-components';
const H1 = styled.h1`
      font-family: 'Thasadith', sans-serif;
      font-size: 36px;
      text-align: center;
      height: 70px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
align-items: center;
`;
const Button = styled.button`
    width: 200px;
    background: ${props => props.theme.red};
    height: 50px;
    border-radius: 5px;
    a {
        font-size: 20px;
    }
    :focus {
        outline: 0;
    }
    :hover {
        text-decoration: underline;
    }
`;
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
// Make Clickable Area Larger
const Contact = () => {
    return (  
        <Container>
            <Wrapper>
            <H1>Questions? Reach Out.</H1>
            <Button>
                <a href="mailto:contact@lambdaschool.com">Email Us</a>                
                </Button>
            </Wrapper>
        </Container>
    );
}
 
export default Contact;