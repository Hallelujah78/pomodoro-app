import React, { useState, useEffect } from "react";
import DoorBell from "./audio/doorbell.wav";
import "./main.css";

//components
import Break from "./components/Break/Break";
import Session from "./components/Session/Session";
import Timer from "./components/Timer/Timer";

const App = () => {
  const [isSession, setIsSession] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [sessionTime, setSessionTime] = useState(25 * 60 * 1000);
  const [breakTime, setBreakTime] = useState(5 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(sessionTime);
  let playPromise;
  useEffect(() => {
    let timerId;
    // if paused is false => it's playing
    if (!isPaused) {
      //if time left is >= 1 second, deduct a second from time left
      if (timeLeft >= 1000) {
        timerId = setInterval(() => {
          setTimeLeft(timeLeft - 1000);
        }, 1000);
      } else {
        //timeleft is equal to zero
        let sound = document.getElementById("beep");

        sound.currentTime = 0;
        playPromise = sound.play();
        //time is zero, if is session ...
        if (isSession) {
          // ... set to not a session, i.e. a break
          setIsSession(!isSession);
          //set time left to break time
          setTimeLeft(breakTime);
        } else {
          // if it's not a session and the time is zero, set time left to session time
          setTimeLeft(sessionTime);
          setIsSession(!isSession);
        }
      }
      // else, if it is paused
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isPaused, timeLeft, isSession]);

  //function to handle the toggling of play/pause

  const playPause = () => {
    if (isPaused) {
      setIsPaused(!isPaused);
    } else {
      setIsPaused(true);
    }
  };

  //click handler for increasing/decreasing break time and session time
  const incrementDecrement = (e) => {
    const button = e.target.id;

    if (button === "session-increment" && isPaused === true) {
      if (Math.floor(sessionTime / (60 * 1000)) < 60) {
        setSessionTime(sessionTime + 60 * 1000);
        setTimeLeft(timeLeft + 60 * 1000);
      }
    } else if (button === "session-decrement" && isPaused === true) {
      if (Math.floor(sessionTime / (60 * 1000)) >= 2) {
        setSessionTime(sessionTime - 60 * 1000);
        setTimeLeft(timeLeft - 60 * 1000);
      }
    } else if (button === "break-increment" && isPaused === true) {
      if (Math.floor(breakTime / (60 * 1000)) < 60) {
        setBreakTime(breakTime + 60 * 1000);
      }
    } else if (button === "break-decrement" && isPaused === true) {
      if (Math.floor(breakTime / (60 * 1000)) >= 2) {
        setBreakTime(breakTime - 60 * 1000);
      }
    }
  };

  //handler for the reset button
  const reset = () => {
    let sound = document.getElementById("beep");

    sound.pause();
    sound.currentTime = 0;

    setIsSession(true);
    setIsPaused(true);
    setSessionTime(25 * 60 * 1000);
    setBreakTime(5 * 60 * 1000);
    setTimeLeft(25 * 60 * 1000);
  };

  return (
    <main className="app">
      <div className="container">
        <header>
          <h3>25 + 5 Clock</h3>
          <div className="title-underline"></div>
        </header>
        <div className="big-screen-container">
          <Session
            incrementDecrement={incrementDecrement}
            sessionTime={sessionTime}
          />
          <Break
            incrementDecrement={incrementDecrement}
            breakTime={breakTime}
          />
        </div>
        <div className="big-timer-container">
          <Timer
            playPause={playPause}
            timeLeft={timeLeft}
            isSession={isSession}
            reset={reset}
            isPaused={isPaused}
          />
        </div>
      </div>
      <audio id="beep">
        <source src={DoorBell} />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
};

export default App;
