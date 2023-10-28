import React, { useState, useEffect } from "react";
import RecipeList from "../Components/Recipe/RecipeList";
import "../App.css";
import "./HomePage.css";
import { BACKEND_URL } from "../constants";

export default function ExplorePage({
  recipeList,
  counter,
  setCounter,
  userProfile,
}) {
  // fetch addedRecipes from user table

  // filter recipes by isPublic
  const [filteredRecipes, setFilteredRecipes] = useState(recipeList);
  const filterPublicRecipes = () => {
    // Parse userProfile.addedRecipe into an array of the first numbers in each number-pair
    const addedRecipeOriginalIds = userProfile.addedRecipes
      ? userProfile.addedRecipes
          .split(",")
          .map((pair) => parseInt(pair.split("-")[0], 10))
      : [];

    console.log("userProfile", JSON.stringify(userProfile));
    console.log(
      "userProfile.addedRecipe",
      JSON.stringify(userProfile.addedRecipes)
    );
    console.log("addedRecipeOriginalIds", addedRecipeOriginalIds);

    const newRecipes = recipeList.filter(
      (recipe) =>
        recipe.isPublic === true &&
        recipe.userId !== userProfile.id &&
        !addedRecipeOriginalIds.includes(recipe.id)
    );

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
    </div>
  );
}
