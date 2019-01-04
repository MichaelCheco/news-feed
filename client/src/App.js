import React, { Component } from 'react';
import Login from './components/Login'
import Posts from './components/Posts'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Posts />
      </div>
    );
  }
}

export default App;
