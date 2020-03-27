import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../styles/App.css";
import Header from "../components/Header";
import LinkList from "../pages/Linklist";
import Mutate from "../pages/Mutate";
import Login from "../pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact component={LinkList} />
        <Route path="/add" component={Mutate} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
