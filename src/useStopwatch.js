import { useEffect, useReducer } from 'react';
import { INCREMENT_TIMER, LAP_RESET, START_STOP } from './constants';

let interval;

const initialState = { isRunning: false, timeElapsed: 0, previousTime: 0, lapTimes: [] }

const reducer = (state, action) => {
    switch (action) {
        case START_STOP:
            return { ...state, isRunning: !state.isRunning }
        case INCREMENT_TIMER:
            return { ...state, timeElapsed: state.timeElapsed + 1 }
        case LAP_RESET:
            if (!state.isRunning) {
                return { isRunning: false, timeElapsed: 0, previousTime: 0, lapTimes: [] }
            } else {
                return {
                    ...state,
                    previousTime: state.timeElapsed,
                    lapTimes: [state.timeElapsed - state.previousTime, ...state.lapTimes]
                }
            }
        default:
            return state
    }
}
export function useStopwatch() {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.isRunning) {
            interval = setInterval(() =>
                dispatch(INCREMENT_TIMER)
                , 10)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval()

    }, [state.isRunning])

    const lapReset = () => dispatch(LAP_RESET)
    const startStop = () => dispatch(START_STOP)

    return { ...state, lapReset, startStop }
}
