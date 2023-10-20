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

  const user = { id: 1, name: "Gordon Ramsey" };

  const [filteredRecipes, setFilteredRecipes] = useState(recipeList);

  const filterNewlyAdded = () => {
    const newRecipes = recipeList.filter(
      (recipe) => !recipe.lastCookedDate && recipe.userId === user.id
    );
    setFilteredRecipes(newRecipes);
  };

  const filterSomethingFamiliar = () => {
    const familiarRecipes = recipeList.filter(
      (recipe) => recipe.lastCookedDate && recipe.userId === user.id
    );
    setFilteredRecipes(familiarRecipes);
  };

  useEffect(() => {
    filterNewlyAdded();
  }, [recipeList]);

  const [selectedButton, setSelectedButton] = useState("newlyadded"); // Default to 'newlyadded'

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
        Hi {user.name}, what would you like to cook today?
      </div>
      <div className="buttons-container">
        <Button
          variant="contained"
          style={
            selectedButton === "newlyadded"
              ? { backgroundColor: "#2b2b2b", color: "white" }
              : {
                  backgroundColor: "whitesmoke",
                  color: "#2b2b2b",
                  border: "1px solid #2b2b2b",
                }
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
              : {
                  backgroundColor: "whitesmoke",
                  color: "#2b2b2b",
                  border: "1px solid #2b2b2b",
                }
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
          {selectedButton === "newlyAdded"
            ? "Looks like you have not added any recipes yet - feel free to explore or add one!"
            : "Looks like you have not cooked any recipes yet~"}
        </div>
      )}
      <NewRecipeModal />
    </div>
  );
}
