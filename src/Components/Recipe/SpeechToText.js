import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import TextToSpeech from "./TextToSpeech";

const SpeechToText = () => {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(true);
  const commands = [
    {
      command: "step *",
      callback: (number) => setMessage(`Step ${number} is being read`),
    },
    {
      command: ["Next", "Okay"],
      callback: () => setMessage(`The next step is being read`),
      matchInterim: true,
    },
    {
      command: ["Repeat", "Again", "previous"],
      callback: () => setMessage(`The previous step is being read again`),
      matchInterim: true,
    },
    {
      command: ["Hello", "Hi", "yo"],
      callback: ({ command }) =>
        setMessage(`${command} there! What shall we cook today?"`),
      matchInterim: true,
    },
    {
      command: "stop",
      callback: () => {
        setMessage(`Goodbye!`);
        setListening(false);
      },
    },
    {
      command: ["clear", "reset"],
      callback: ({ resetTranscript }) => resetTranscript(),
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
      <p>Message: {message}</p>
      <TextToSpeech predefinedText={message} />
    </div>
  );
};
export default SpeechToText;
