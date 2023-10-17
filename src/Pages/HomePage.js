import { React, useEffect } from "react";
import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import "../App.css";

export default function HomePage({ recipeList, counter, setCounter }) {
  useEffect(() => {
    setCounter(counter + 1);
  }, []);
  return (
    <div className="childDiv">
      {/* <h3>This is the Home page</h3> */}
      {/* <SpeechToText /> */}
      {/* {console.log(props.recipeList)} */}
      <RecipeList recipeList={recipeList} />
      <NewRecipeModal />
    </div>
  );
}
