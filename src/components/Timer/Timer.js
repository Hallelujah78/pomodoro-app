import React from "react";
import "./Timer.css";
import formatTime from "../../helperFunctions";
const Timer = ({ timeLeft, isSession, reset, playPause, isPaused }) => {
  return (
    <div className="timer-container">
      <label id="timer-label" htmlFor="time-left">
        {isSession ? "Session" : "Break"}
      </label>
      <div id="time-left">{`${formatTime(
        Math.floor(timeLeft / 60 / 1000)
      )}:${formatTime((timeLeft / 1000) % 60)}`}</div>
      <div className="button-container">
        <button className="btn l-btn" onClick={playPause} id="start_stop">
          {isPaused ? "Play" : "Stop"}
        </button>
        <button className="btn r-btn" onClick={reset} id="reset">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

// 60, 60, 1000
// 5, 300 => 25 seconds elapse:
// => 300-25 = 275
// => 275 % 60 = 45 seconds
