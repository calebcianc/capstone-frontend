// external imports
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import HomeIcon from "@mui/icons-material/Home";

// internal imports
import CookbookList from "../Components/Cookbook/CookbookList";
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import { GlobalUseContext } from "../GlobalUseContext";
import { BACKEND_URL } from "../constants";

// CSS imports
import "../App.css";
import "./HomePage.css";
import "../Components/Cookbook/CookbookList.css";

export default function HomePage({ recipeList, counter, setCounter }) {
  // counter to force rerender whenever a new recipe is added
  useEffect(() => {
    setCounter(counter + 1);
    console.log("======> recipeList", recipeList);
    console.log("======> userProfile", userProfile);
  }, []);

  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  const [recipeToDisplay, setRecipeToDisplay] = useState(recipeList);

  // fetch user's cookbooks and recipes in each cookbook
  const [userCookbooks, setUserCookbooks] = useState([]);
  const [userCookbookRecipes, setUserCookbookRecipes] = useState([]);
  useEffect(() => {
    if (userProfile) {
      fetch(`${BACKEND_URL}/cookbooks/${userProfile.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("cookbooks", JSON.stringify(data));
          setUserCookbooks(data);
        });

      fetch(`${BACKEND_URL}/cookbooks/recipes/${userProfile.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("cookbookrecipes", JSON.stringify(data));
          setUserCookbookRecipes(data);
        });
    }
  }, [counter]);

  // home page renders newly added recipes by default
  useEffect(() => {
    filterNewlyAdded();
  }, [recipeList]);

  // buttons to filter recipes by newly added or something familiar
  const [selectedButton, setSelectedButton] = useState("newlyadded"); // Default to 'newlyadded'
  const handleNewlyAddedClick = () => {
    filterNewlyAdded();
    setSelectedButton("newlyadded"); // Update selected button state
  };
  const handleSomethingFamiliarClick = () => {
    filterSomethingFamiliar();
    setSelectedButton("somethingfamiliar"); // Update selected button state
  };

  // functions to filter recipes by newly added or something familiar
  const filterNewlyAdded = () => {
    const newRecipes = userProfile
      ? recipeList.filter(
          (recipe) => !recipe.lastCookedDate && recipe.userId === userProfile.id
        )
      : recipeList;
    setRecipeToDisplay(newRecipes);
  };

  const filterSomethingFamiliar = () => {
    const familiarRecipes = userProfile
      ? recipeList.filter(
          (recipe) => recipe.lastCookedDate && recipe.userId === userProfile.id
        )
      : recipeList;
    setRecipeToDisplay(familiarRecipes);
  };

  return (
    <div className="childDiv">
      <div className="greeting">
        Hi {userProfile?.name}, what would you like to cook today?
      </div>
      {/* <div className="buttons-container">
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
      </div> */}

      <div className="cookbook-list-container">
        {userCookbooks.map((cookbook) => {
          return (
            <CookbookList
              cookbook={cookbook}
              recipeList={recipeList}
              userCookbookRecipes={userCookbookRecipes}
            />
          );
        })}
      </div>

      {/* {recipeToDisplay.length > 0 ? (
        <RecipeList recipeList={recipeToDisplay} />
      ) : (
        <div className="text-container">
          {selectedButton === "newlyadded"
            ? "Looks like you have not added any recipes yet - feel free to explore or add one!"
            : "Looks like you have not cooked any recipes yet~"}
        </div>
      )} */}
      <NewRecipeModal setCounter={setCounter} />
    </div>
  );
}
