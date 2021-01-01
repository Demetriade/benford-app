import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppBar from './components/CustomAppBar';
import Home from "./components/Home";
import What from "./components/What";
import Instagram from "./components/Instagram"
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/what">
            <AppBar />
            <What />
          </Route>
          <Route path="/ig">
            <AppBar />
            <Instagram />
          </Route>
          <Route path="/">
            <AppBar />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
