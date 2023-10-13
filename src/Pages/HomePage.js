import React from "react";
import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import "../App.css";

export default function HomePage(props) {
  return (
    <div
      // style={{
      //   position: "relative",
      //   width: "100%",
      //   height: "85svh",
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      className="childDiv"
    >
      <h3>This is the Home page</h3>
      {/* <SpeechToText /> */}
      {/* {console.log(props.recipeList)} */}
      <RecipeList recipeList={props.recipeList} />
      <NewRecipeModal />
    </div>
  );
}
