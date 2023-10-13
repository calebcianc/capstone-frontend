import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import TextToSpeech from "./TextToSpeech";

const SpeechToText = ({ setCurrentCardIndex, totalSteps, instructions }) => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState(false);
  const commands = [
    {
      command: ["next step"],
      callback: () =>
        setCurrentCardIndex((prev) => {
          if (prev < totalSteps - 1) {
            setMessage(`Move to next step`);
            return prev + 1;
          } else {
            // Add a sound/ using text-to-speech to inform about the last step
            setMessage(`You are already at the last step.`);
            console.log("You are already at the last step.");
            return prev; // Remain on the current step
          }
        }),
    },
    {
      command: ["previous step"],
      callback: () =>
        setCurrentCardIndex((prev) => {
          if (prev > 0) {
            setMessage(`Move to previous step`);
            return prev - 1;
          } else {
            // Add a sound/ using text-to-speech to inform about the last step
            setMessage(`You are already at the first step.`);
            console.log("You are already at the first step.");
            return prev; // Remain on the current step
          }
        }),
    },
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    {
      commands,
    }
  );

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({
        continuous: true,
      });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening]);

  const toggleListening = () => {
    setListening((prev) => !prev);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={toggleListening}>{listening ? "Stop" : "Start"}</button>
      <p>transcript: {transcript}</p>
      <p>message: {message}</p>
    </div>
  );
};
export default SpeechToText;
