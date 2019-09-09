import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>iPhone Stopwatch</h1>
        <Stopwatch status={false} timeElapsed={0} />
      </div>
    );
  }
}

function Stopwatch({ status, timeElapsed }) {
  return (
    <div>
      <p>{timeElapsed}</p>
      <button>{status ? 'Stop' : 'Start'}</button>
      <button>Reset/Lap</button>
    </div>
  );
}

export default App;
