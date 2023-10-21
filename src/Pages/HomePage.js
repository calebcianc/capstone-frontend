import React, { useEffect, useState } from "react";
// import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
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

  const [userProfile, setUserProfile] = useState([]);
  const [folderRecipes, setFolderRecipes] = useState([]);
  const [folders, setFolders] = useState([]);

  // const user = { id: 1, name: "Gordon Ramsey" };
  const { user, isAuthenticated } = useAuth0();

  // get user profile
  const getUserProfile = async () => {
    let data;
    data = await axios.get(`http://localhost:3001/users/profile/${user.email}`);
    setUserProfile(data.data);
    // console.log(data.data);
  };

  // get folder and recipes
  const getFolderRecipes = async () => {
    let data;
    data = await axios.get(`http://localhost:3001/folders/${user.email}`);
    setFolderRecipes(data.data);
    setFolders(
      data.data.map((folder) => ({ id: folder.id, name: folder.name }))
    );
    // console.log(data.data);
    // console.log(
    //   data.data.map((folder) => ({ id: folder.id, name: folder.name }))
    // );
  };

  useEffect(() => {
    isAuthenticated && getUserProfile();
    isAuthenticated && getFolderRecipes();
    return;
  }, [isAuthenticated]);

  // const [filteredFolderRecipes, setfilteredFolderRecipes] = useState([]);
  const [recipeToDisplay, setRecipeToDisplay] = useState(recipeList);

  const filterFolderRecipes = (id) => {
    const selectedFolderRecipes = folderRecipes.filter(
      (folderRecipe) => folderRecipe.id === id
    );
    // setfilteredFolderRecipes(selectedFolderRecipes);
    // console.log(folderRecipes);
    // console.log(id);
    setRecipeToDisplay(selectedFolderRecipes[0].recipes);
  };

  const handleFolderClick = (id) => {
    filterFolderRecipes(id);
    // setSelectedButton("newlyadded"); // Update selected button state
  };

  // filter recipe list on user filter selection
  // const [filteredRecipes, setFilteredRecipes] = useState(recipeList);

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
      Folders
      <br />
      {folders.map((folder) => (
        <Button
          key={folder.id}
          variant="contained"
          onClick={() => handleFolderClick(folder.id)}
        >
          {folder.name}
        </Button>
      ))}
      {/* {console.log(recipeToDisplay)} */}
      {recipeToDisplay.length > 0 ? (
        <RecipeList recipeList={recipeToDisplay} />
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
