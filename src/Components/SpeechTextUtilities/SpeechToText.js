import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import TextToSpeech from "./TextToSpeech";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from "@mui/material";

const SpeechToText = ({
  setCurrentCardIndex,
  totalSteps,
  instructions,
  listening,
  setListening,
}) => {
  const [message, setMessage] = useState(false);
  const commands = [
    {
      command: ["next step"],
      callback: () =>
        setCurrentCardIndex((prev) => {
          if (prev < totalSteps - 1) {
            console.log(`Move to next step`);
            return prev + 1;
          } else {
            // Add a sound/ using text-to-speech to inform about the last step
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
            console.log(`Move to previous step`);
            return prev - 1;
          } else {
            // Add a sound/ using text-to-speech to inform about the last step
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
      {listening ? (
        <IconButton onClick={toggleListening}>
          <KeyboardVoiceIcon />
        </IconButton>
      ) : (
        <IconButton onClick={toggleListening}>
          <MicOffIcon />
        </IconButton>
      )}
      {/* <p>transcript: {transcript}</p>
      <p>message: {message}</p> */}
    </div>
  );
};
export default SpeechToText;
