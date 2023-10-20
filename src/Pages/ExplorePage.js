import React, { useState, useEffect } from "react";
import AglioOlioRecipe from "../Test/AglioOlioRecipe";
import TextToSpeech from "../Components/SpeechTextUtilities/TextToSpeech";

import RecipeList from "../Components/Recipe/RecipeList";
import "../App.css";
import "./HomePage.css";

export default function ExplorePage({ recipeList, counter, setCounter }) {
  const text = "Testing text to speech";

  // filter recipes by isPublic
  const [filteredRecipes, setFilteredRecipes] = useState(recipeList);
  const filterPublicRecipes = () => {
    const newRecipes = recipeList.filter((recipe) => recipe.isPublic === true);
    setFilteredRecipes(newRecipes);
  };

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  useEffect(() => {
    filterPublicRecipes();
  }, [recipeList]);

  return (
    <div className="childDiv">
      <div className="greeting">Try something new today 😋</div>
      <RecipeList recipeList={filteredRecipes} />

      {/* <button onClick={() => TextToSpeech(text)}>Test text to speech</button> */}
    </div>
  );
}
