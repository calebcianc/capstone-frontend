import BACKEND_URL from "../../constants";
async function TextToSpeech(text) {
  const response = await fetch(`${BACKEND_URL}/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);

  // Return a promise that resolves when the audio ends
  return new Promise((resolve) => {
    audio.onended = resolve;
    audio.play();
  });
}
export default TextToSpeech;
