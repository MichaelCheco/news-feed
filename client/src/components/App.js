import React, { Component, Fragment } from "react";
import Login from "./Login";
import Posts from "./Posts";
import DetailPage from "./DetailPage";
import Header from "./Header";
import Search from "./Search";
import Create from "./Create";
import Banner from './Banner'
import { Route, Switch, Link } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
const Container = styled.div`
  margin: 0px;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-gap: 0;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 100px 50px 2fr 1fr;
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

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Container>
          <Banner />
            <Header />
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Posts} />
              <Route path="/search" component={Search} />
              <Route path="/post/:id" component={DetailPage} />
              <Route path="/create" component={Create} />
            </Switch>
          </Container>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default App;
