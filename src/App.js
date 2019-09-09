import React, { Component } from 'react';
import './App.css';
import {Stopwatch} from './Stopwatch';

class App extends Component {
  state = {
    status: false,
    timeElapsed: 0
  }

  handleStartStop = () => {
    this.setState(state => {
        if (state.status) {
        clearInterval(this.timer);
      }
      else {
        const beginTime = Date.now() - state.timeElapsed;
        this.timer = setInterval(()=> {
          this.setState({ 
              timeElapsed: Date.now() - beginTime });
        }, 10)
      }
      return {status: !state.status};
    })
  }

  handleResetLap = () => {
    clearInterval(this.timer);
    this.setState({ timeElapsed: 0, status: false });
  }

  render() {
    return (
      <div className="App">
        <h1>iPhone Stopwatch</h1>
        <Stopwatch timeElapsed={this.state.timeElapsed} status={this.state.status} handleStartStop={this.handleStartStop} handleResetLap={this.handleResetLap}/>
      </div>
    );
  }
}



export default App;