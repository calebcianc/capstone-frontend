import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { BACKEND_URL } from "../constants";
import UserDetails from "../Components/Profile/UserDetails";
import UserDashboard from "../Components/Profile/UserDashboard";
import "./ProfilePage.css";

export default function ProfilePage({ recipeList, counter, setCounter }) {
  const [userProfile, setUserProfile] = useState([]);
  const [toggleProfileRefresh, setToggleProfileRefresh] = useState(false);
  const [toggleShowEdit, setToggleShowEdit] = useState(true);
  const [toggleShowSubmit, setToggleShowSubmit] = useState(false);
  const [toggleShowEdit1, setToggleShowEdit1] = useState(true);
  const [toggleShowSubmit1, setToggleShowSubmit1] = useState(false);
  const [userRecipe, setUserRecipe] = useState([]);
  const { loginWithRedirect, isAuthenticated, user, isLoading, logout } =
    useAuth0();

  const filterUserLastCook = () => {
    if (!userProfile) return [];

    return recipeList
      .filter(
        (recipe) => recipe.lastCookedDate && recipe.userId === userProfile.id
      )
      .sort((a, b) => new Date(b.lastCookedDate) - new Date(a.lastCookedDate));
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfile();
    }
    return;
  }, [isAuthenticated, toggleProfileRefresh]);

  const getUserProfile = async () => {
    try {
      const data = await axios.get(
        `${BACKEND_URL}/users/profile/${user.email}`
      );
      setUserProfile(data.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    if (userProfile) {
      const lastCookedRecipes = filterUserLastCook();
      setUserRecipe(lastCookedRecipes);
    }
  }, [userProfile, counter]);

  const LoginButton = (
    <Button
      variant="contained"
      style={{ backgroundColor: "#2b2b2b", color: "white" }}
      onClick={() => loginWithRedirect()}
      // startIcon={<LoginRoundedIcon />}
      size="large"
    >
      {isLoading ? "Loading ..." : "Sign up / Log in"}
    </Button>
  );

  const LogoutButton = (
    <Button
      variant="contained"
      style={{ backgroundColor: "#2b2b2b", color: "white" }}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      startIcon={<LogoutIcon />}
      size="large"
    >
      Logout
    </Button>
  );

  return (
    <div className="childDiv">
      <div className="greeting">
        <div>Profile Page</div>
        <div>{isAuthenticated ? LogoutButton : LoginButton}</div>
      </div>
      {isAuthenticated ? (
        <div className="profileChildDiv">
          <UserDetails
            style={{ flexGrow: 1 }}
            userProfile={userProfile}
            user={user}
            toggleProfileRefresh={toggleProfileRefresh}
            setToggleProfileRefresh={setToggleProfileRefresh}
          />

          <UserDashboard
            style={{ flexGrow: 1 }}
            userProfile={userProfile}
            toggleShowSubmit={toggleShowSubmit}
            setToggleShowSubmit={setToggleShowSubmit}
            toggleShowEdit={toggleShowEdit}
            setToggleShowEdit={setToggleShowEdit}
            toggleProfileRefresh={toggleProfileRefresh}
            setToggleProfileRefresh={setToggleProfileRefresh}
            toggleShowSubmit1={toggleShowSubmit1}
            setToggleShowSubmit1={setToggleShowSubmit1}
            toggleShowEdit1={toggleShowEdit1}
            setToggleShowEdit1={setToggleShowEdit1}
            userRecipe={userRecipe}
          />
        </div>
      ) : (
        <div className="text-container">
          {" "}
          "Looks like you have not logged in"
        </div>
      )}
    </div>
  );
}
