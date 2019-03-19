import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Pet Store</h1>
      <Router>
        <div>
          <ul className="App__nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/store">Store</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>Create Account</li>
            <li>Login</li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/store" component={Store} />
          <Route path="/users" component={Users} />
        </div>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Store() {
  return (
    <div>
      <h1>Store</h1>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}

export default App;
