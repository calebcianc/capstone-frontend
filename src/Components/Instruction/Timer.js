import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import alarmSound from "./alarm_clock.mp3";
import "./Timer.css";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import PauseIcon from "@material-ui/icons/Pause";
// import ReplayIcon from "@material-ui/icons/Replay";

import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ReplayIcon from "@mui/icons-material/Replay";

function Timer({ duration, currentInstruction }) {
  // const [timeLeft, setTimeLeft] = useState(10); for testing
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [audio] = useState(new Audio(alarmSound));

  // Reset timer when duration changes
  useEffect(() => {
    // setTimeLeft(10); for testing

    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [duration, currentInstruction]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            // Play the alarm sound when timer reaches 0
            audio.play();
            return 0;
          }
          if (prevTime > 0) {
            return prevTime - 1;
          }
          clearInterval(interval); // Clear interval when timer reaches 0
          return 0;
        });
      }, 1000);

      setIntervalId(interval);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [isRunning, audio]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setTimeLeft(duration * 60);
  };

  // voice command to start, pause and stop timer
  const commands = [
    {
      command: "start timer",
      callback: startTimer,
    },
    {
      command: "pause timer",
      callback: pauseTimer,
    },
    {
      command: "reset timer",
      callback: resetTimer,
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error("Your browser does not support speech recognition.");
      return;
    }

    SpeechRecognition.startListening({ continuous: true });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <div>
      <div className={`timer-display ${timeLeft === 0 ? "shake" : ""}`}>
        <div className="timer-container">
          <AccessAlarmIcon />
          <span>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>

          <div className="timer-controls">
            <button onClick={startTimer}>
              <PlayCircleFilledWhiteIcon style={{ fontSize: 24 }} />
            </button>

            <button onClick={pauseTimer}>
              <PauseCircleIcon style={{ fontSize: 24 }} />
            </button>

            <button onClick={resetTimer}>
              <ReplayIcon style={{ fontSize: 24 }} />
            </button>
          </div>
        </div>
      </div>
      {/* <div>transcript: {transcript}</div> */}
    </div>
  );
}

export default Timer;
