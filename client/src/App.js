import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Jokes from "./components/Users";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/jokes">
          <Jokes />
        </Route>
      </div>
    </Router>
  );
}

export default App;
