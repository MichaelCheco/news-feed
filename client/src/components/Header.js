import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { withRouter } from "react-router";
import styled from "styled-components";
const MyHeader = styled.div`
  grid-row: 2 / 2;
  grid-column: 1 / span 10;
  background: ${props => props.theme.darkBlue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const H2 = styled.h2`
    width: 30%;
`;
const Nav = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-left: 170px;
    font-size: 17px;
    font-weight: bold;
    background: ${props => props.theme.darkBlue};
    a {
        background: ${props => props.theme.darkBlue};

    }
`;
class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <MyHeader>
          <Nav>
        <Link to="/"><i class="fas fa-newspaper"></i> Feed</Link>
        <Link to="/search"><i class="fas fa-search"></i> Search </Link>
        <Link to="/store"><i class="fas fa-store"></i> Store</Link>
        {authToken && <Link to="/create"><i class="far fa-plus-square"></i> Create</Link>}
        </Nav>
        
      </MyHeader>
    );
  }
}

export default withRouter(Header);
