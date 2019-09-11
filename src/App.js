import React, { Component } from 'react';
import './App.css';

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
      }
    }
    else {
      this.setState({ timeElapsed: 0, status: false, lapsList: [] });
    }
  }

  millisecondConversion = (timeElapsed) => {
    const milliseconds = timeElapsed % 100;
    const seconds = Math.floor((timeElapsed / 100) % 60);
    const minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
    const pad = (time) => time < 10 ? '0' + time : time
    return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
  }

  minMaxCheck = (laps) => {
    const checkMinLap = Math.min.apply(Math, this.state.lapsList)
    const checkMaxLap = Math.max.apply(Math, this.state.lapsList)

    if (laps === checkMinLap && this.state.lapsList.length > 2) {
      return 'green'
    }
    else if (laps === checkMaxLap && this.state.lapsList.length > 2) {
      return 'red'
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="time">{this.millisecondConversion(this.state.timeElapsed)}</h1>
        <div className="button__wrapper">
          <button className="button__item" onClick={this.handleResetLap}>{this.state.status || this.state.timeElapsed === 0 ? 'Lap' : 'Reset'}</button>
          <button className={this.status ? 'button__item button__red' : 'button__item button__green'} onClick={this.handleStartStop}>{this.state.status ? 'Stop' : 'Start'}</button>
        </div>
        <table className="timer__table">
          <tbody>
            <tr><td>Lap</td><td>{this.millisecondConversion(this.state.timeElapsed)}</td></tr>
            {this.state.lapsList.slice(0).reverse().map((laps, index) => (
              <tr key={index} className={this.minMaxCheck(laps)}>
                <td>Lap {this.state.lapsList.length - index}</td><td>{this.millisecondConversion(laps)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;