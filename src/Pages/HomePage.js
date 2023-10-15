import { React } from "react";
import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import "../App.css";

export default function HomePage(props) {
  return (
    <div className="childDiv">
      {/* <h3>This is the Home page</h3> */}
      {/* <SpeechToText /> */}
      {/* {console.log(props.recipeList)} */}
      <RecipeList recipeList={props.recipeList} />
      <NewRecipeModal />
    </div>
  );
}
