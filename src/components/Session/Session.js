import React from "react";
import "./Session.css";

const Session = ({ sessionTime, incrementDecrement }) => {
  return (
    <div className="session-length-container">
      <label id="session-label" htmlFor="session-length">
        Session Length
      </label>
      <div id="session-length">{`${Math.floor(sessionTime / 60 / 1000)}`}</div>
      <div className="button-container">
        <button
          className="btn l-btn"
          onClick={incrementDecrement}
          id="session-decrement"
        >
          -
        </button>
        <button
          className="btn r-btn"
          onClick={incrementDecrement}
          id="session-increment"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Session;
