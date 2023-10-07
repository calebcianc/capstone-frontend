import React, { useEffect } from "react";

const TextToSpeech = ({ predefinedText }) => {
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(predefinedText);
    window.speechSynthesis.speak(utterance);
  }, [predefinedText]);

  return <div></div>;
};

export default TextToSpeech;

// to change to google API
