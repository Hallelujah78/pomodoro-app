import React, { useState, useEffect, useRef } from "react";
import DoorBell from "./audio/doorbell.wav";
import "./App.css";
import formatTime from "./helperFunctions";

//components
import Break from "./components/Break/Break";
import Session from "./components/Session/Session";
import Timer from "./components/Timer/Timer";

const App = () => {
  let timerInterval = useRef(null);
  let sessionRef = useRef(true);
  const [isSession, setIsSession] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });
  const [timeLeftString, setTimeLeftString] = useState({
    minutes: "25",
    seconds: "00",
  });

  const playPause = () => {
    if (timerInterval.current) {
      setIsPaused(true);
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    } else {
      setIsPaused(false);

      handleTimer();
    }
  };

  const incrementDecrement = (e) => {
    const button = e.target.id;

    if (button === "session-increment" && isPaused === true) {
      if (sessionTime < 60) {
        setSessionTime(sessionTime + 1);
        setTimeLeft({ minutes: sessionTime + 1, seconds: 0 });
        setTimeLeftString({
          minutes: formatTime(sessionTime + 1),
          seconds: "00",
        });
      }
    } else if (button === "session-decrement" && isPaused === true) {
      if (sessionTime >= 2) {
        setSessionTime(sessionTime - 1);
        setTimeLeft({ minutes: sessionTime - 1, seconds: 0 });
        setTimeLeftString({
          minutes: formatTime(sessionTime - 1),
          seconds: "00",
        });
      }
    } else if (button === "break-increment" && isPaused === true) {
      if (breakTime < 60) {
        setBreakTime(breakTime + 1);
      }
    } else if (button === "break-decrement" && isPaused === true) {
      if (breakTime >= 2) {
        setBreakTime(breakTime - 1);
      }
    }
  };

  const reset = () => {
    clearInterval(timerInterval.current);
    timerInterval.current = null;
    sessionRef = true;
    let sound = document.getElementById("beep");

    sound.currentTime = 0;
    sound.pause();
    setIsSession(true);
    setIsPaused(true);
    setSessionTime(25);
    setBreakTime(5);
    setTimeLeft({ minutes: 25, seconds: 0 });
    setTimeLeftString({
      minutes: "25",
      seconds: "00",
    });
  };

  //handleTimer is only called when the play button has been clicked
  const handleTimer = () => {
    let session = isSession;
    let paused = isPaused;
    //get the time left on the timer values
    let myTime = timeLeft.minutes + timeLeft.seconds / 60;

    myTime = new Date(myTime * 60 * 1000);

    timerInterval.current = setInterval(() => {
      //if timer is not 00:00 then run the timer and update state
      if (myTime.getMinutes() >= 1 || myTime.getSeconds() >= 1) {
        myTime = myTime - new Date(1000);
        myTime = new Date(myTime);

        setTimeLeft({
          minutes: myTime.getMinutes(),
          seconds: myTime.getSeconds(),
        });
        setTimeLeftString({
          minutes: formatTime(myTime.getMinutes()),
          seconds: formatTime(myTime.getSeconds()),
        });
        console.log(myTime.getMinutes() + ":" + myTime.getSeconds());
      } else {
        let sound = document.getElementById("beep");
        sound.play();
        clearInterval(timerInterval.current);
        console.log(sessionRef.current);
        if (sessionRef.current === true) {
          setIsSession(false);
          session = false;
          sessionRef = false;
          console.log(sessionRef);
          setTimeLeft({ minutes: breakTime, seconds: 0 });
          setTimeLeftString({ minutes: formatTime(breakTime), seconds: "00" });
          handleTimer();
        } else {
        }
      }
    }, 1000);

    // setMinutes();, setMilliseconds(); getMinutes(), getMilliseconds, getSeconds();
    // toTimeString()
    //
  };

  return (
    <div className="App">
      <h2>25 + 5 Clock</h2>
      <Session
        incrementDecrement={incrementDecrement}
        sessionTime={sessionTime}
      />
      <Break incrementDecrement={incrementDecrement} breakTime={breakTime} />

      <Timer
        playPause={playPause}
        timeLeftString={timeLeftString}
        isSession={isSession}
        reset={reset}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <audio id="beep">
        <source src={DoorBell} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default App;
