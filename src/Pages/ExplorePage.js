import React, { useEffect } from "react";
import AglioOlioRecipe from "../Test/AglioOlioRecipe";
import TextToSpeech from "../Components/SpeechTextUtilities/TextToSpeech";

import RecipeList from "../Components/Recipe/RecipeList";
import "../App.css";

export default function ExplorePage({ recipeList, counter, setCounter }) {
  const text = "Testing text to speech";

  // filter recipes by isPublic

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  return (
    <div className="childDiv">
      <h3>This is the Explore page</h3>
      <RecipeList recipeList={recipeList} />

      {/* <button onClick={() => TextToSpeech(text)}>Test text to speech</button> */}
    </div>
  );
}
