import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer } from './useStopwatch';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe('Timer reducer', () => {
  let previousState;
  let newState;
  
  describe('upon initialization', () => {

    beforeEach(() => {
      previousState = {
        isRunning: false, 
        timeElapsed: 0, 
        previousTime: 0, 
        lapTimes: [] 
      }
    })

    describe('and the START_STOP button is clicked', () => {
      beforeEach(() => {
        newState = reducer(previousState, 'START_STOP')
      })
      it('sets isRunning to true', () => {
        expect(newState.isRunning).toBe(true)
      })
      it('has an empty lap array', () => {
        expect(newState.lapTimes).toHaveLength(0)
      })
    });

    describe('and the LAP_RESET button is clicked', () => {
      beforeEach(() => {
        newState = reducer(previousState, 'LAP_RESET')
      })
      it('shows isRunning is false', () => {
        expect(newState.isRunning).toBe(false)
      })
    });

  });

});

describe('Check elements on DOM', () => {
  it('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("loads the clock with initial value of 00:00.00", () => {
    const wrapper = shallow(<App />);
    const clock = wrapper.find(".time").text();
    expect(clock).toEqual("00:00.00");
  });

  it("renders start button", () => {
    const wrapper = shallow(<App />);
    const startButton = wrapper.find(".start-stop").text();
    expect(startButton).toEqual("Start");
  });

  it("renders lap button", () => {
    const wrapper = shallow(<App />);
    const startButton = wrapper.find(".lap-reset").text();
    expect(startButton).toEqual("Lap");
  });
});