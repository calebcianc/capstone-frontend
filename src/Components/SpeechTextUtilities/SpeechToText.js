import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import TextToSpeech from "./TextToSpeech";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from "@mui/material";
import TextToSpeech from "./TextToSpeech";

const SpeechToText = ({
  setCurrentCardIndex,
  currentCardIndex,
  totalSteps,
  instructions,
  listening,
  setListening,
  onClose,
}) => {
  console.log("onClose", onClose);
  useEffect(() => {
    const currentStep = instructions.find(
      (instr) => instr.id === currentCardIndex + 1
    );

    const currentInstruction = currentStep.instruction;
    console.log(currentInstruction);

    TextToSpeech(currentInstruction).then(() => {
      if (currentCardIndex === totalSteps - 1) {
        TextToSpeech("You have reached the end of the recipe. Enjoy! ");
      }
    });
  }, [currentCardIndex]);

  const playCurrentInstruction = () => {
    const currentStep = instructions.find(
      (instr) => instr.id === currentCardIndex + 1
    );

    if (currentStep) {
      const currentInstruction = currentStep.instruction;
      console.log(currentInstruction);
      TextToSpeech(currentInstruction);
    }
  };

  const moveToNextStep = () => {
    if (currentCardIndex < totalSteps - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      TextToSpeech("You are already at the last step.");
    }
  };

  const moveToPreviousStep = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      TextToSpeech("You are already at the first step.");
    }
  };

  const commands = [
    {
      command: ["next step"],
      callback: moveToNextStep,
    },
    {
      command: ["previous step"],
      callback: moveToPreviousStep,
    },
    {
      command: ["repeat"],
      callback: playCurrentInstruction,
    },
    {
      command: ["close", "end"],
      callback: () => {
        TextToSpeech("The step popup will now be close. Goodbye!").then(() => {
          onClose();
        });
      },
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
      <IconButton onClick={() => setListening((prev) => !prev)}>
        {listening ? <KeyboardVoiceIcon /> : <MicOffIcon />}
      </IconButton>
    </div>
  );
};
export default SpeechToText;
