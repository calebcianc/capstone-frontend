import React from "react";
import AglioOlioRecipe from "../Test/AglioOlioRecipe";
import speak from "../Components/SpeechTextUtilities/text2speech";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import RecipeList from "../Components/Recipe/RecipeList";

export default function ExplorePage() {
  const text = AglioOlioRecipe.instructions["Step 1"];
  console.log(AglioOlioRecipe.instructions["Step 1"]);

  return (
    <div>
      <h3>This is the Explore page</h3>
      <RecipeList />
      {/* <button onClick={() => speak(text)}>Test text to speech</button> */}
    </div>
  );
}
