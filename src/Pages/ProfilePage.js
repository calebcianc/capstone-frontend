import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import Button from "@mui/material/Button";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { BACKEND_URL } from "../constants";
import EditCuisinePreferences from "../Components/Profile/EditCuisinePreferences";
import EditDietaryRestrictions from "../Components/Profile/EditDietaryRestrictions";
export default function ProfilePage() {
  const STORAGE_USERUPLOADS_REF = "UserData/";

  const [userProfile, setUserProfile] = useState([]);
  const [showChangeDisplay, setShowChangeDisplay] = useState(false);
  const [toggleProfileRefresh, setToggleProfileRefresh] = useState(false);
  const [toggleShowEdit, setToggleShowEdit] = useState(true);
  const [toggleShowSubmit, setToggleShowSubmit] = useState(false);
  const [toggleShowEdit1, setToggleShowEdit1] = useState(true);
  const [toggleShowSubmit1, setToggleShowSubmit1] = useState(false);

  const { loginWithRedirect, isAuthenticated, user, isLoading, logout } =
    useAuth0();

  useEffect(() => {
    isAuthenticated && getUserProfile();
    return;
  }, [isAuthenticated, toggleProfileRefresh]);

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

  const handleChangeDisplayButton = () => {
    setShowChangeDisplay(true);
  };

  const [fileInputValue, setFileInputValue] = useState("");
  const [fileInputFile, setFileInputFile] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const fullStorageRef = storageRef(
      storage,
      STORAGE_USERUPLOADS_REF +
        `${userProfile.id}/profile/` +
        fileInputFile.name
    );

    const uploadTask = uploadBytesResumable(fullStorageRef, fileInputFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        // get photo url
        getDownloadURL(uploadTask.snapshot.ref, fileInputFile.name).then(
          (url) => {
            setUserPicture(url);
            setFileInputFile(null);
            setFileInputValue("");
            setShowChangeDisplay(false);
          }
        );
      }
    );
  };

  const setUserPicture = async (url) => {
    // save photo url to db and toggle photo refresh
    await axios.put(`http://localhost:3001/users/profile/photo`, {
      email: user.email,
      profilePictureUrl: url,
    });
    setToggleProfileRefresh(!toggleProfileRefresh);
  };

  return (
    <div>
      <h3>This is the Profile page</h3>
      {!isAuthenticated && LoginButton}
      {isAuthenticated && LogoutButton}
      <br />
      <br />
      {user && (
        <div>
          {/* {console.log(user)} */}
          <img
            src={
              userProfile.profilePictureUrl
                ? userProfile.profilePictureUrl
                : user.picture
            }
            alt="Profile"
            width="100"
            height="100"
          />
          <br />
          {!showChangeDisplay ? (
            <Button variant="contained" onClick={handleChangeDisplayButton}>
              Change Display Picture
            </Button>
          ) : (
            <div>
              <form className="Review-Container" onSubmit={handlePostSubmit}>
                {/* photo upload */}
                <div className="inputContainer">
                  <label>
                    <input
                      className="inputTag"
                      type="file"
                      value={fileInputValue}
                      onChange={(e) => {
                        setFileInputFile(e.target.files[0]);
                        setFileInputValue(e.target.file);
                      }}
                    />
                  </label>
                </div>
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </form>
            </div>
          )}
          <br />
          <br />
          Name: {userProfile?.name}
          <br />
          <br />
          Email: {userProfile?.email}
          <br />
          <br />
          Joined: {userProfile.createdAt?.slice(0, 10)}
          <br /> <br />
          Cusine Preferences: {userProfile?.cusinePreferences}
          {userProfile.cusinePreferences && toggleShowSubmit && (
            <EditCuisinePreferences
              preloadCuisinePreferences={userProfile?.cusinePreferences}
              userId={userProfile?.id}
              toggleProfileRefresh={toggleProfileRefresh}
              setToggleProfileRefresh={setToggleProfileRefresh}
              setToggleShowEdit={setToggleShowEdit}
              toggleShowSubmit={toggleShowSubmit}
              setToggleShowSubmit={setToggleShowSubmit}
            />
          )}{" "}
          {toggleShowEdit && (
            <Button
              variant="contained"
              onClick={() => {
                setToggleShowEdit(!toggleShowEdit);
                setToggleShowSubmit(!toggleShowSubmit);
              }}
            >
              Edit
            </Button>
          )}
          <br /> <br />
          Dietary Restrictions: {userProfile?.dietaryRestrictions}
          <br />
          {userProfile.dietaryRestrictions && toggleShowSubmit1 && (
            <EditDietaryRestrictions
              preloadDietaryRestrictions={userProfile?.dietaryRestrictions}
              userId={userProfile?.id}
              toggleProfileRefresh={toggleProfileRefresh}
              setToggleProfileRefresh={setToggleProfileRefresh}
              setToggleShowEdit={setToggleShowEdit1}
              toggleShowSubmit={toggleShowSubmit1}
              setToggleShowSubmit={setToggleShowSubmit1}
            />
          )}{" "}
          {toggleShowEdit1 && (
            <Button
              variant="contained"
              onClick={() => {
                setToggleShowEdit1(!toggleShowEdit1);
                setToggleShowSubmit1(!toggleShowSubmit1);
              }}
            >
              Edit
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
