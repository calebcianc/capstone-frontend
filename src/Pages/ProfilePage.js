import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import BACKEND_URL from "../constants";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState([]);
  const { loginWithRedirect, isAuthenticated, user, isLoading, logout } =
    useAuth0();

  useEffect(() => {
    isAuthenticated && getUserProfile();
    return;
  }, [isAuthenticated]);

  const getUserProfile = async () => {
    let data;
    data = await axios.get(`http://localhost:3001/users/profile/${user.email}`);
    setUserProfile(data.data);
    // console.log(data.data);
  };

  // login
  const LoginButton = (
    <Button
      variant="outlined"
      onClick={() => loginWithRedirect()}
      startIcon={<LoginRoundedIcon />}
      size="large"
    >
      {isLoading ? "Loading ..." : "Log In/ Sign Up"}
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
    <div>
      <h3>This is the Profile page</h3>
      {!isAuthenticated && LoginButton}
      {isAuthenticated && LogoutButton}
      <br />
      <br />
      {user && (
        <div>
          Name: {userProfile?.name}
          <br />
          <br />
          Email: {userProfile?.email}
          <br />
          <br />
          Joined: {userProfile.createdAt?.slice(0, 10)}
          <br /> <br />
          Cusine Preferences: {userProfile?.cusinePreferences}
          <br /> <br />
          Dietary Restrictions: {userProfile?.dietaryRestrictions}
          <br />
        </div>
      )}
    </div>
  );
}
