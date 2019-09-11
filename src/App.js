import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

const App = () => {
  const [status, setStatus] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [lapsList, setLapsList] = useState([])
  const [previousLap, setPreviousLap] = useState(0)

  const tick = useCallback(() => {
    setTimeElapsed(time => time + 1)
  }, [setTimeElapsed])

  useEffect(() => {
    if(status) {
      const interval = setInterval(tick, 10)
      return () => clearInterval(interval)
    }
  }, [status, tick])

  const handleStartStop = useCallback(() => {
    if (status) {
      setStatus(false);
    }
    else {
      setStatus(true);
    }
  }, [status, setStatus])

  const handleResetLap = useCallback(() => {
    if (status && timeElapsed > 0) {
      if (lapsList.length === 0) {
        setPreviousLap(timeElapsed);
        setLapsList([...lapsList, timeElapsed])
      }
      else {
        setLapsList([...lapsList, timeElapsed - previousLap])
        setPreviousLap(timeElapsed)
      }
    }
    else {
      setTimeElapsed(0)
      setStatus(false)
      setLapsList([])
    }
  }, [status, timeElapsed, lapsList, previousLap, setStatus, setTimeElapsed, setLapsList, setPreviousLap])

  const millisecondConversion = useCallback((timeElapsed) => {
    const milliseconds = timeElapsed % 100;
    const seconds = Math.floor((timeElapsed / 100) % 60);
    const minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
    const pad = (time) => time < 10 ? '0' + time : time
    return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
  }, [])

  const minMaxCheck = useCallback((laps) => {
    const checkMinLap = Math.min.apply(Math, lapsList)
    const checkMaxLap = Math.max.apply(Math, lapsList)
    if (laps === checkMinLap && lapsList.length > 2) return 'green'
    else if (laps === checkMaxLap && lapsList.length > 2) return 'red'
  }, [lapsList])

  const renderTopRow = useCallback(() => {
    if (lapsList.length === 0) {
      return <tr><td>Lap 1</td><td>{millisecondConversion(timeElapsed)}</td></tr>
    }
    else {
      return <tr><td>Lap {lapsList.length + 1}</td><td>{millisecondConversion(timeElapsed - previousLap)}</td></tr>
    }
  }, [lapsList, timeElapsed, millisecondConversion, previousLap])

    return (
      <div className="container">
        <h1 className="time">{millisecondConversion(timeElapsed)}</h1>
        <div className="button__wrapper">
          <button className="button__item" onClick={handleResetLap}>{status || timeElapsed === 0 ? 'Lap' : 'Reset'}</button>
          <button className={status ? 'button__item button__red' : 'button__item button__green'} onClick={handleStartStop}>{status ? 'Stop' : 'Start'}</button>
        </div>
        <table className="timer__table">
          <tbody>
            {renderTopRow()}
            {lapsList.slice(0).reverse().map((laps, index) => (
              <tr key={index} className={minMaxCheck(laps)}>
                <td>Lap {lapsList.length - index}</td><td>{millisecondConversion(laps)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default App;