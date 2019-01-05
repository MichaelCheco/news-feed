import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'
import { withRouter } from 'react-router'
class Header extends Component {
    render() { 
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (  
            <Fragment>
                <h2>NewsFeed</h2>
                <Link to="/login">Login</Link>
                <Link to ="/">Feed</Link>
                <Link to ="/search">Search</Link>
                {authToken && (
                    <Link to="/create">Create</Link>
                )}
                <button onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN)
                    this.props.history.push("/login")
                    }}>Logout</button>
            </Fragment>
        );
    }
}
 
export default withRouter(Header);