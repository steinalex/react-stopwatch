import React, { Component } from 'react';
import './App.css';
import { Stopwatch } from './Stopwatch';

class App extends Component {
  state = {
    status: false,
    timeElapsed: 0,
    lapsList: [],
    previousLap: 0,
    minLap: 0,
    maxLap: 0
  }

  handleStartStop = () => {
    if (this.state.status) {
      clearInterval(this.timer);
      this.setState({ status: false });
    }
    else {
      this.timer = setInterval(() => {
        this.setState((previousTime) => ({
          timeElapsed: previousTime.timeElapsed + 1
        }))
      }, 10)
      this.setState({ status: true });
    }
  }

  handleResetLap = () => {
    if (this.state.status && this.state.timeElapsed > 0) {
      if (this.state.lapsList.length === 0) {
        this.previousLap = this.state.timeElapsed;
        this.setState(state => {
          state.lapsList.push(this.state.timeElapsed)
        })
      }
      else {
        this.state.lapsList.push(this.state.timeElapsed - this.previousLap)
        this.previousLap = this.state.timeElapsed;
        this.minLap = Math.min(...this.state.lapsList)
        this.maxLap = Math.max(...this.state.lapsList)
      }
    }
    else {
      this.setState({ timeElapsed: 0, status: false, lapsList: [] });
    }
  }

  render() {
    return (
      <div className="container">
        <Stopwatch minLap={this.minLap} maxLap={this.maxLap} previousLap={this.state.previousLap} lapsList={this.state.lapsList} timeElapsed={this.state.timeElapsed} status={this.state.status} handleStartStop={this.handleStartStop} handleResetLap={this.handleResetLap} />
      </div>
    );
  }
}

export default App;