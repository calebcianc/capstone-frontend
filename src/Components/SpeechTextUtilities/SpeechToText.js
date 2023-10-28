import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from "@mui/material";
import TextToSpeech, {
  stopTextToSpeech,
} from "../SpeechTextUtilities/TextToSpeech";

const SpeechToText = ({
  setCurrentCardIndex,
  currentCardIndex,
  totalSteps,
  instructions,
  listening,
  setListening,
  onClose,
}) => {
  useEffect(() => {
    const currentStep = instructions.find(
      (instr) => instr.step === currentCardIndex
    );
    const currentInstruction = currentStep.instruction;

    TextToSpeech(currentInstruction).then(() => {
      if (currentCardIndex === totalSteps) {
        TextToSpeech("You have reached the end of the recipe. Enjoy! ");
      }
    });
  }, [currentCardIndex]);

  const playCurrentInstruction = () => {
    console.log("repeat command recognized");

    const currentStep = instructions.find(
      (instr) => instr.step === currentCardIndex
    );
    console.log("Current Step:", currentStep);

    if (currentStep) {
      const currentInstruction = currentStep.instruction;
      TextToSpeech(currentInstruction);
    }
  };

  const moveToNextStep = () => {
    if (currentCardIndex < totalSteps) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      TextToSpeech("You are already at the last step.");
    }
  };

  const moveToPreviousStep = () => {
    if (currentCardIndex > 1) {
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
    {
      command: ["stop"],
      callback: () => {
        console.log("Stop command recognized");
        stopTextToSpeech();
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
      {/* {transcript} */}
    </div>
  );
};
export default SpeechToText;
