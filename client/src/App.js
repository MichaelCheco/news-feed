import React, { Component } from 'react';
import Login from './components/Login'
import Posts from './components/Posts'
import { BrowserRouter } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Login />
        <Posts />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
