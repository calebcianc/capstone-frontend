import React from "react";
import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import RecipeList from "../Components/Recipe/RecipeList";
import RecipePartialSurprise from "../Components/NewRecipe/RecipePartialSurprise";

export default function HomePage() {
  return (
    <div>
      {/* <h3>This is the Home page</h3>
      <SpeechToText /> */}
      {/* <RecipeList /> */}
      <RecipePartialSurprise />
    </div>
  );
}
