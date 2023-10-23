import { BACKEND_URL } from "../../constants";

// Assuming at the top of the file
let currentAudio = null;

async function TextToSpeech(text) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  const response = await fetch(`${BACKEND_URL}/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  currentAudio = new Audio(audioUrl);
  console.log("New audio set");

  return new Promise((resolve) => {
    currentAudio.onended = () => {
      currentAudio = null;
      resolve();
    };
    currentAudio.play();
  });
}

export function stopTextToSpeech() {
  if (currentAudio) {
    console.log("Stopping audio");
    currentAudio.pause();
    currentAudio = null;
  } else {
    console.log("No audio to stop");
  }
}

export default TextToSpeech;
