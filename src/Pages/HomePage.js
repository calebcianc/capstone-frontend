import { React, useState, useEffect } from "react";
import axios from "axios";

import SpeechToText from "../Components/SpeechTextUtilities/SpeechToText";
import RecipeList from "../Components/Recipe/RecipeList";
import NewRecipeModal from "../Components/NewRecipe/NewRecipeModal";
import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

export default function HomePage(props) {
  const [userAuth0Info, setUserAuth0Info] = useState(null);

  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  useEffect(() => {
    isAuthenticated && getUserAuth0Info();
    return;
  }, [isAuthenticated]);

  const getUserAuth0Info = async () => {
    let data = [];
    data = await axios.get(
      `http://localhost:3001/users/management/${user.email}`
    );
    setUserAuth0Info(data.data[0]);
  };

  const LoginButton = (
    <Button
      variant="outlined"
      onClick={() => loginWithRedirect()}
      startIcon={<LoginRoundedIcon />}
      size="large"
    >
      {isLoading ? "Loading ..." : "Log In"}
    </Button>
  );

  const LogoutButton = (
    <Button
      variant="contained"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Logout!
    </Button>
  );

  return (
    <div className="childDiv">
      {/* <h3>This is the Home page</h3> */}
      {/* <SpeechToText /> */}
      {/* {console.log(props.recipeList)} */}
      {/* {console.log(user)} */}
      {/* {console.log(userAuth0Info)} */}
      logins_count: {userAuth0Info?.logins_count}
      <br />
      <br />
      User email: {user?.email}
      <br />
      {!isAuthenticated && LoginButton}
      <br />
      {isAuthenticated && LogoutButton}
      <br />
      <RecipeList recipeList={props.recipeList} />
      <NewRecipeModal />
    </div>
  );
}
