import React from "react";

import AglioOlioRecipe from "../Test/AglioOlioRecipe";
import TextToSpeech from "../Components/SpeechTextUtilities/TextToSpeech";

import RecipeList from "../Components/Recipe/RecipeList";
import "../App.css";

export default function ExplorePage(props) {

  const text = "Testing text to speech";


  return (
    <div className="childDiv">
      <h3>This is the Explore page</h3>
      <RecipeList recipeList={props.recipeList} />

      <button onClick={() => TextToSpeech(text)}>Test text to speech</button>

    </div>
  );
}
