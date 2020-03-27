import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../styles/App.css";
import LinkList from "../pages/Linklist";
import Mutate from "../pages/Mutate";

function App() {
  return (
    <div className="App">
      <h3>HackerNews</h3>
      <Router>
        <Route path="/" exact component={LinkList} />
        <Route path="/add" component={Mutate} />
      </Router>
    </div>
  );
}

export default App;
