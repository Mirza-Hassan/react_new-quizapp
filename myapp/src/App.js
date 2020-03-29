import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from "./component/Quiz";

class App extends Component {

  render() {
      return (
          <div className="App">

            <h1>React Quiz</h1>
          <Quiz />
          </div>
      );
  }
}

export default App;