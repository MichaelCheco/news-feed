import React, { Component, Fragment } from "react";
import Login from "./Login";
import Posts from "./Posts";
import DetailPage from "./DetailPage";
import Header from "./Header";
import Search from "./Search";
import Create from "./Create";
import Banner from './Banner'
import girl from '../img/lambdagirl.png'
import { Route, Switch, Redirect, Link } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Tracks from "./Tracks";
const Container = styled.div`
  margin: 0px;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-gap: 0;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 100px 50px 1fr 1fr;
`;
const LinkWrapper = styled.div`
display: flex;
justify-content: space-between;
  grid-column: 7 / 10;
  width: 100%;
  font-family: 'Thasadith', sans-serif;
  text-align: center;
  margin-left: 45px;
  color: black;
  font-size: 18px;
  grid-row: 4;
a {
  color: black;
  margin: 5px 5px;
}
`;

const theme = {
  darkBlue: "#004466",
  mediumBlue: "#036699",
  lightBlue: "#99CBCC",
  lightGrey: "#E4E5E6",
  red: "#FF2104"
};
const GlobalStyle = createGlobalStyle`
  html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
      background: whitesmoke;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'Raleway', sans-serif;    
      }
      img {
        width: 100%;
        height: auto;
      }
    a {
        text-decoration: none;
        color: white;

    }
`;

const Girl = styled.img`
  grid-column: 7 / 10;
  margin-left: 45px;
  border-radius: 5px;
  margin-top: 58px;
  grid-row: 3;
  align-self: end;
`;


class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Container>
          <Banner />
            <Header />
            <Girl src={girl} alt="Girl in Lambda Sweater" />
            <LinkWrapper>
            <Link to="/tracks">Tracks</Link>
            <Link to="#">About</Link>
            <Link to="#">Apply Now</Link>
            <Link to="#">Contact Us</Link>
            <Link to="#">Referral</Link>
            </LinkWrapper>
            <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
              <Route path="/login" component={Login} />
              <Route path="/tracks" component={Tracks} />
              <Route exact path="/new/:page" component={Posts} />
              <Route path="/search" component={Search} />
              <Route path="/post/:id" component={DetailPage} />
              <Route path="/create" component={Create} />
              <Route exact path='/new/:page' component={Posts} />
            </Switch>
          </Container>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default App;
