import React from "react";
import AglioOlioRecipe from "../Test/AglioOlioRecipe";
import TextToSpeech from "../Components/SpeechTextUtilities/TextToSpeech";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import RecipeList from "../Components/Recipe/RecipeList";
import "../App.css";

export default function ExplorePage(props) {
  const text = AglioOlioRecipe.instructions["Step 1"];
  console.log(AglioOlioRecipe.instructions["Step 1"]);

  return (
    <div className="childDiv">
      <h3>This is the Explore page</h3>
      <RecipeList recipeList={props.recipeList} />
      {/* <button onClick={() => TextToSpeech(text)}>Test text to speech</button> */}
    </div>
  );
}
