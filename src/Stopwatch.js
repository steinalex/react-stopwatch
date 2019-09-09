import React, { Component } from 'react';

const millisecondConversion = (timeElapsed) => {
    var milliseconds = timeElapsed % 1000;
    var seconds = Math.floor((timeElapsed / 1000) % 60);
    var minutes = Math.floor((timeElapsed / (60 * 1000)) % 60);
    const pad = (time) => time < 10 ? '0' + time : time
    
    return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
}

export class Stopwatch extends Component {
    render() {
      const { status, timeElapsed, handleStartStop, handleResetLap } = this.props; {
        return (
          <div>
            <p>{millisecondConversion(timeElapsed)}</p>
            <button onClick={handleStartStop}>{status ? 'Stop' : 'Start'}</button>
            <button onClick={handleResetLap}>Reset</button>
          </div>
        );
      }
    }
  }