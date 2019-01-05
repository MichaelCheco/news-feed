import React, { Component } from 'react';
import Login from './components/Login'
import Posts from './components/Posts'
import DetailPage from './components/DetailPage'
import Header from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Posts} />
      <Route path="/post/:id" component={DetailPage} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
