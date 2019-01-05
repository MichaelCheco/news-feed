import React, { Component } from 'react';
import Login from './components/Login'
import Posts from './components/Posts'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Posts} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
