import React from "react";

const Break = ({ breakTime, incrementDecrement }) => {
  return (
    <div className="break-length-container">
      <label id="break-label" htmlFor="break-length">
        Break Length
      </label>

      <div id="break-length">{breakTime / (60 * 1000)}</div>
      <div className="button-container">
        <button
          className="btn l-btn"
          onClick={incrementDecrement}
          id="break-decrement"
        >
          -
        </button>
        <button
          className="btn r-btn"
          onClick={incrementDecrement}
          id="break-increment"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default Break;
