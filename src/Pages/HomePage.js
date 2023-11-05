// external imports
import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

// internal imports
import CookbookList from "../Components/Cookbook/CookbookList";
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

  // fetch user's cookbooks and recipes in each cookbook
  const [userCookbooks, setUserCookbooks] = useState([]);
  const [userCookbookRecipes, setUserCookbookRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && userProfile) {
        try {
          const cookbooksResponse = await fetch(
            `${BACKEND_URL}/cookbooks/${userProfile.id}`
          );
          const cookbooksData = await cookbooksResponse.json();
          setUserCookbooks(cookbooksData);
          console.log("userCookbooks", JSON.stringify(userCookbooks));

          const recipesResponse = await fetch(
            `${BACKEND_URL}/cookbooks/recipes/${userProfile.id}`
          );
          const recipesData = await recipesResponse.json();
          setUserCookbookRecipes(recipesData);
          console.log(
            "userCookbookRecipes",
            JSON.stringify(userCookbookRecipes)
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [counter, userProfile, isAuthenticated]);

  // const [recipeToDisplay, setRecipeToDisplay] = useState(recipeList);
  // home page renders newly added recipes by default
  // useEffect(() => {
  //   filterNewlyAdded();
  // }, [recipeList]);

  // buttons to filter recipes by newly added or something familiar
  // const [selectedButton, setSelectedButton] = useState("newlyadded"); // Default to 'newlyadded'
  // const handleNewlyAddedClick = () => {
  //   filterNewlyAdded();
  //   setSelectedButton("newlyadded"); // Update selected button state
  // };
  // const handleSomethingFamiliarClick = () => {
  //   filterSomethingFamiliar();
  //   setSelectedButton("somethingfamiliar"); // Update selected button state
  // };

  // functions to filter recipes by newly added or something familiar
  // const filterNewlyAdded = () => {
  //   const newRecipes = userProfile
  //     ? recipeList.filter(
  //         (recipe) => !recipe.lastCookedDate && recipe.userId === userProfile.id
  //       )
  //     : recipeList;
  //   setRecipeToDisplay(newRecipes);
  // };

  // const filterSomethingFamiliar = () => {
  //   const familiarRecipes = userProfile
  //     ? recipeList.filter(
  //         (recipe) => recipe.lastCookedDate && recipe.userId === userProfile.id
  //       )
  //     : recipeList;
  //   setRecipeToDisplay(familiarRecipes);
  // };

  // checks if there are any recipes in the user's cookbooks
  const allEmpty = Object.values(userCookbookRecipes).every(
    (arr) => arr.length === 0
  );
  const { loginWithRedirect, isLoading } = useAuth0();
  const LoginButton = (
    <Button
      variant="contained"
      style={{ backgroundColor: "#2b2b2b", color: "white" }}
      onClick={() => loginWithRedirect()}
      // startIcon={<LoginRoundedIcon />}
      size="large"
    >
      {isLoading ? "Loading ..." : "Sign Up / Log In"}
    </Button>
  );

  return (
    <div className="childDiv">
      {/* text that shows depending on whether user is logged in or not */}
      {isAuthenticated ? (
        <div className="greeting">
          Hi {userProfile?.name},{" "}
          {allEmpty ? (
            <>check out "Explore" or add a recipe!</>
          ) : (
            "what would you like to cook today?"
          )}
        </div>
      ) : (
        <div className="empty-message">
          Sign up and log in to store recipes in your cookbooks! <br />
          <br />
          {LoginButton}
        </div>
      )}

      {/* container that renders recipes in each cookbook if there are any to show */}
      <div className="cookbook-list-container">
        {!allEmpty &&
          userCookbooks.map((cookbook) => {
            const cookbookRecipes = userCookbookRecipes[cookbook.id];
            return cookbookRecipes && cookbookRecipes.length > 0 ? (
              <CookbookList
                key={cookbook.id}
                cookbook={cookbook}
                recipeList={recipeList}
                userCookbookRecipes={userCookbookRecipes}
              />
            ) : null;
          })}
      </div>

      <NewRecipeModal setCounter={setCounter} />
    </div>
  );
}
