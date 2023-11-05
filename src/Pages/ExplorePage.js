// external import
import React, { useState, useEffect, useContext } from "react";
import { Switch } from "@mui/material";

// internal import
import RecipeList from "../Components/Recipe/RecipeList";
import { GlobalUseContext } from "../GlobalUseContext";

// css import
import "../App.css";
import "./HomePage.css";
import "./ExplorePage.css";

export default function ExplorePage({
  recipeList,
  counter,
  setCounter,
  userProfile,
}) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipeList);
  const [checked, setChecked] = useState(false);
  const { isAuthenticated } = useContext(GlobalUseContext);

  // filter recipes by isPublic and userId
  const filterPublicRecipes = () => {
    // Parse userProfile.addedRecipe into an array of the first numbers in each number-pair
    const addedRecipeOriginalIds = userProfile.addedRecipes
      ? userProfile.addedRecipes
          .split(",")
          .map((pair) => parseInt(pair.split("-")[0], 10))
      : [];
    const newRecipes = recipeList.filter((recipe) => {
      // Initial filters
      let isValid =
        recipe.isPublic === true &&
        recipe.userId !== userProfile.id &&
        !addedRecipeOriginalIds.includes(recipe.id);

      // Additional filters when 'checked' state is true
      if (checked) {
        const userCuisinePreferences = userProfile.cuisinePreferences;
        const userDietaryRestrictions = userProfile.dietaryRestrictions;

        // Cuisine Preferences Filter
        if (userCuisinePreferences && userCuisinePreferences !== "None") {
          // Splitting preferences into an array for comparison
          const userCuisineArray = userCuisinePreferences.split(",");
          isValid = isValid && userCuisineArray.includes(recipe.cuisine);
        }

        // Dietary Restrictions Filter
        if (userDietaryRestrictions && userDietaryRestrictions !== "None") {
          // Splitting restrictions into an array for comparison
          const userDietArray = userDietaryRestrictions.split(",");
          isValid =
            isValid && userDietArray.includes(recipe.dietaryRestrictions);
        }
      }

      return isValid;
    });

    setFilteredRecipes(newRecipes);
  };

  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  useEffect(() => {
    filterPublicRecipes();
    console.log("filteredRecipes", JSON.stringify(filteredRecipes));
    console.log("userProfile", JSON.stringify(userProfile));
  }, [recipeList, checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log("checked", checked);
  };

  return (
    <div className="childDiv">
      <div className="explore-top">
        <div className="greeting">Try something new today 😋</div>
        {isAuthenticated && (
          <div className="match-preferences">
            Match my preferences
            <Switch checked={checked} onChange={handleChange} />
          </div>
        )}
      </div>
      <RecipeList recipeList={filteredRecipes} />
    </div>
  );
}
