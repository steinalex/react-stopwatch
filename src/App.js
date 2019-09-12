import React from 'react';
import './App.css';
import { useStopwatch } from './useStopwatch';


const App = () => {

  const stopWatch = useStopwatch()

  const { isRunning, timeElapsed, previousTime, lapTimes, lapReset, startStop } = stopWatch

  const startStopLbl = isRunning ? 'Stop' : 'Start'
  const lapResetlbl = isRunning || timeElapsed === 0 ? 'Lap' : 'Reset'
  
  return (
    <div className="container">
      <h1 className="time">{millisecondConversion(timeElapsed)}</h1>
      <div className="button__wrapper">
        <button className='button__item' onClick={lapReset}>{lapResetlbl}</button>
        <button className='button__item' onClick={startStop}>{startStopLbl}</button>
      </div>
      <table className="timer__table">
        <tbody>
          {renderRow(lapTimes.length + 1, millisecondConversion(timeElapsed - previousTime))}
          {lapTimes.map(
              (lap, index) => renderRow(lapTimes.length - index, millisecondConversion(lap), index)
            )}
        </tbody>
      </table>
    </div>
  );
}

const pad = time => time < 10 ? `0${time}` : time

const millisecondConversion = (timeElapsed) => {
  const milliseconds = timeElapsed % 100;
  const seconds = Math.floor((timeElapsed / 100) % 60)
  const minutes = Math.floor((timeElapsed / (60 * 100)) % 60)
  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`
}

const renderRow = (lap, time, index) =>
  <tr key={index}>
    <td>Lap {lap}</td>
    <td>{time}</td>
  </tr>

export default App;