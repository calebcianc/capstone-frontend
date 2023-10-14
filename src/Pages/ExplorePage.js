import React from "react";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import RecipeList from "../Components/Recipe/RecipeList";
import "../App.css";

export default function ExplorePage(props) {
  const text = "Read this line";

  return (
    <div className="childDiv">
      <h3>This is the Explore page</h3>
      <RecipeList recipeList={props.recipeList} />
    </div>
  );
}
