import React from "react";
import AglioOlioRecipe from "../Test/AglioOlioRecipe";
import speak from "../Components/SpeechTextUtilities/text2speech";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";

export default function ExplorePage() {
  const text = AglioOlioRecipe.instructions["Step 1"];
  console.log(AglioOlioRecipe.instructions["Step 1"]);

  return (
    <div>
      <h1>This is the Explore page</h1>
      <button onClick={() => speak(text)}>Test text to speech</button>
      <NewRecipeModal />
    </div>
  );
}
