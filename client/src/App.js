import React, { Component } from 'react';
import './App.css';
import Home from "./Home/Home";


class App extends Component {

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/images/logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">The BookStore!</h1>
        </header>
        <Home/>

      </div>
    );
  }
}

export default App;
