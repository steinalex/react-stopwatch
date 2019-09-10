import React, { Component } from 'react';

const millisecondConversion = (timeElapsed) => {
    const milliseconds = timeElapsed % 100;
    const seconds = Math.floor((timeElapsed / 100) % 60);
    const minutes = Math.floor((timeElapsed / (60 * 100)) % 60);
    const pad = (time) => time < 10 ? '0' + time : time

    return pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds);
}

export class Stopwatch extends Component {
    render() {
        const { status, timeElapsed, handleStartStop, handleResetLap, lapsList, minLap, maxLap } = this.props; {
            return (
                <>
                    <h1 className="time">{millisecondConversion(timeElapsed)}</h1>
                    <div className="button__wrapper">
                        <button className="button__item" onClick={handleResetLap}>{status || timeElapsed === 0 ? 'Lap' : 'Reset'}</button>
                        <button className={status ? 'button__item button__red' : 'button__item button__green'} onClick={handleStartStop}>{status ? 'Stop' : 'Start'}</button>
                    </div>
                    <table className="timer__table">
                        <tbody>
                        <tr><td>Lap</td><td>{millisecondConversion(timeElapsed)}</td></tr>
                        {lapsList.slice(0).reverse().map((laps, index) => (
                            <tr>
                                <td>Lap {lapsList.length-index}</td><td>{millisecondConversion(laps)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            );
        }
    }
}