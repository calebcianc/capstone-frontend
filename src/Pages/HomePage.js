// external imports
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import HomeIcon from "@mui/icons-material/Home";

// internal imports
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import { GlobalUseContext } from "../GlobalUseContext";

// CSS imports
import "../App.css";
import "./HomePage.css";

export default function HomePage({ recipeList, counter, setCounter }) {
  // counter to force rerender whenever a new recipe is added
  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  const [recipeToDisplay, setRecipeToDisplay] = useState(recipeList);
  const [folderRecipes, setFolderRecipes] = useState([]);
  const [folders, setFolders] = useState([]);

  // home page renders newly added recipes by default
  useEffect(() => {
    filterNewlyAdded();
  }, [recipeList]);

  // once authenticated, get user profile and folder recipes
  useEffect(() => {
    // isAuthenticated && getFolderRecipes();
    return;
  }, [isAuthenticated]);

  // get folder and recipes
  // const getFolderRecipes = async () => {
  //   let data;
  //   data = await axios.get(`http://localhost:3001/folders/${user.email}`);
  //   setFolderRecipes(data.data);
  //   setFolders(
  //     data.data.map((folder) => ({ id: folder.id, name: folder.name }))
  //   );
  // };

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
    const newRecipes = recipeList.filter(
      (recipe) => !recipe.lastCookedDate && recipe.userId === userProfile.id
    );
    setRecipeToDisplay(newRecipes);
  };

  const filterSomethingFamiliar = () => {
    const familiarRecipes = recipeList.filter(
      (recipe) => recipe.lastCookedDate && recipe.userId === userProfile.id
    );
    setRecipeToDisplay(familiarRecipes);
  };

  // code relating to folder recipes below

  // filter recipe list on user filter selection
  const [filteredRecipes, setFilteredRecipes] = useState(recipeList);

  const [filteredFolderRecipes, setfilteredFolderRecipes] = useState([]);
  const filterFolderRecipes = (id) => {
    const selectedFolderRecipes = folderRecipes.filter(
      (folderRecipe) => folderRecipe.id === id
    );
    setRecipeToDisplay(selectedFolderRecipes[0].recipes);
  };
  const handleFolderClick = (id) => {
    filterFolderRecipes(id);
    // setSelectedButton("newlyadded"); // Update selected button state
  };

  return (
    <div className="childDiv">
      <div className="greeting">
        Hi {userProfile.name}, what would you like to cook today?
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
      {/* commented out folder buttons for now */}
      {/* Folders
      <br />
      {folders.map((folder) => (
        <Button
          key={folder.id}
          variant="contained"
          onClick={() => handleFolderClick(folder.id)}
        >
          {folder.name}
        </Button>
      ))} */}
      {recipeToDisplay.length > 0 ? (
        <RecipeList recipeList={recipeToDisplay} />
      ) : (
        <div className="text-container">
          {selectedButton === "newlyadded"
            ? "Looks like you have not added any recipes yet - feel free to explore or add one!"
            : "Looks like you have not cooked any recipes yet~"}
        </div>
      )}
      <NewRecipeModal />
    </div>
  );
}
