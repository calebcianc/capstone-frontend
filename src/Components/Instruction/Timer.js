import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Timer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) return prevTime - 1;
          clearInterval(interval);
          return 0;
        });
      }, 1000);

      setIntervalId(interval);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [isRunning]);

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
      <div>
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>transcript: {transcript}</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
