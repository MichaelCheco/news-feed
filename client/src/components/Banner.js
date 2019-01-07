import styled from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { Link } from "react-router-dom";
const Top = styled.div`
  grid-row: 1;
  grid-column: 1 / span 10;
  display: flex;
  justify-content: space-between;
  background: whitesmoke;
`;
const Logo1 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  font-size: 40px;
  color: white;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: ${props => props.theme.mediumBlue};
`;
const Logo2 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  font-size: 40px;
  color: white;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: ${props => props.theme.lightBlue};
`;
const Logo3 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  font-size: 40px;
  color: white;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: ${props => props.theme.red};
`;
const LogoWrapper = styled.div`
  width: 40%;
  display: flex;
  margin-left: 170px;
  align-items: center;
`;
const Button = styled.div`
  font-size: 17px;
  width: 70px;
  color: black;
  height: 40px;
  padding: 5px;
  cursor: pointer;

  text-decoration: underline;
`;
const LinkStyles = styled.div`
  font-size: 17px;
  margin-top: 9px;
  width: 70px;
  height: 40px;
  text-decoration: underline;
  font-family: 'Thasadith', sans-serif;
  a {
    color: black;
  }
`;
const Auth = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`;
class Banner extends Component {
  state = {};
  render() {
    return (
      <Top>
        <LogoWrapper>
          <Logo1>L</Logo1>
          <Logo2>S</Logo2>
          <Logo3>N</Logo3>
        </LogoWrapper>
        <Auth>
          <LinkStyles>
            <Link to="/login">
              <i class="fas fa-sign-in-alt"> Login</i>{" "}
            </Link>
          </LinkStyles>{" "}
          <Button
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              this.props.history.push("/login");
            }}
          >
            <i class="fas fa-sign-out-alt">Logout</i>
          </Button>
        </Auth>
      </Top>
    );
  }
}

export default withRouter(Banner);
