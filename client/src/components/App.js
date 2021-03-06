import React, { Component, Fragment } from 'react';
import Login from './Login';
import Posts from './Posts';
import DetailPage from './DetailPage';
import Header from './Header';
import Search from './Search';
import Create from './Create';
import Banner from './Banner';
import girl from '../img/lambdagirl.png';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Tracks from './Tracks';
import Contact from './Contact';
import About from './About';
import SingleTrack from './SingleTrack';

const theme = {
	darkBlue: '#004466',
	mediumBlue: '#036699',
	lightBlue: '#99CBCC',
	lightGrey: '#E4E5E6',
	red: '#FF2104',
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
        font-family: 'Thasadith', sans-serif;    
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
const Links = styled.div`
	@media (min-width: 375px) {
		display: flex;
		justify-content: space-around;
		a {
			color: gray;
		}
	}
	@media (min-width: 450px) {
		a {
			font-size: 1.7rem;
		}
	}
	@media (min-width: 500px) {
		a {
			font-size: 2rem;
		}
	}
`;
const Girl = styled.img``;

class App extends Component {
	render() {
		return (
			<Fragment>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<div>
						<Banner />
						<Header />
						<Girl src={girl} alt="Girl in Lambda Sweater" />
						<Links>
							<Link to="/tracks">Tracks</Link>
							<Link to="/about"> About</Link>
							<a href="https://lambdaschool.com/apply/">Apply Now</a>
							<Link to="/contact">Contact Us</Link>
							<a href="https://lambdaschool.com/outcomes/">Outcomes</a>
						</Links>
						<Switch>
							<Route exact path="/" render={() => <Redirect to="/new/1" />} />
							<Route path="/login" component={Login} />
							<Route path="/tracks" component={Tracks} />
							<Route path="/contact" component={Contact} />
							<Route path="/about" component={About} />
							<Route exact path="/new/:page" component={Posts} />
							<Route path="/search" component={Search} />
							<Route path="/post/:id" component={DetailPage} />
							<Route path="/track/:id" component={SingleTrack} />
							<Route path="/create" component={Create} />
							<Route exact path="/new/:page" component={Posts} />
						</Switch>
					</div>
				</ThemeProvider>
			</Fragment>
		);
	}
}

export default App;
