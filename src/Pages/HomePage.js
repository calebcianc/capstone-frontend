import React, { useEffect, useState } from "react";
// import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import "../App.css";
import "./HomePage.css";
import { Button } from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import HomeIcon from "@mui/icons-material/Home";

export default function HomePage({ recipeList, counter, setCounter }) {
  // counter to force rerender whenever a new recipe is added
  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  const user = "User1";

  const [filteredRecipes, setFilteredRecipes] = useState(recipeList);

  const filterNewlyAdded = () => {
    const newRecipes = recipeList.filter((recipe) => !recipe.lastCookedDate);
    setFilteredRecipes(newRecipes);
  };

  const filterSomethingFamiliar = () => {
    const familiarRecipes = recipeList.filter(
      (recipe) => recipe.lastCookedDate
    );
    setFilteredRecipes(familiarRecipes);
  };

  useEffect(() => {
    filterNewlyAdded();
  }, [recipeList]);

  const [selectedButton, setSelectedButton] = useState("newlyadded"); // Default to 'newlyadded'
  // Conditional styling based on the selected button
  const newlyAddedStyle =
    selectedButton === "newlyadded"
      ? { backgroundColor: "#2b2b2b", color: "#f7f4e8" }
      : { backgroundColor: "#f7f4e8", color: "#2b2b2b" };
  const somethingFamiliarStyle =
    selectedButton === "somethingfamiliar"
      ? { backgroundColor: "#2b2b2b", color: "#f7f4e8" }
      : { backgroundColor: "#f7f4e8", color: "#2b2b2b" };

  const handleNewlyAddedClick = () => {
    filterNewlyAdded();
    setSelectedButton("newlyadded"); // Update selected button state
  };

  const handleSomethingFamiliarClick = () => {
    filterSomethingFamiliar();
    setSelectedButton("somethingfamiliar"); // Update selected button state
  };

  return (
    <div className="childDiv">
      <div className="greeting">
        Hi {user}, what would you like to cook today?
      </div>
      <div className="buttons-container">
        <Button
          variant="contained"
          style={
            selectedButton === "newlyadded"
              ? { backgroundColor: "#2b2b2b", color: "white" }
              : { backgroundColor: "white", color: "#2b2b2b" }
          }
          endIcon={<FiberNewIcon />}
          onClick={handleNewlyAddedClick}
        >
          Newly Added
        </Button>
        <Button
          variant="contained"
          style={
            selectedButton === "somethingfamiliar"
              ? { backgroundColor: "#2b2b2b", color: "white" }
              : { backgroundColor: "white", color: "#2b2b2b" }
          }
          endIcon={<HomeIcon />}
          onClick={handleSomethingFamiliarClick}
        >
          Something Familiar
        </Button>
      </div>
      {filteredRecipes.length > 0 ? (
        <RecipeList recipeList={filteredRecipes} />
      ) : (
        <div className="text-container">
          Looks like there are no recipes available.
        </div>
      )}
      <NewRecipeModal />
    </div>
  );
}
