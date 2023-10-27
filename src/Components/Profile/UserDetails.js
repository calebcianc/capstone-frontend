import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../../Pages/ProfilePage.css";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { storage } from "../../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

function UserDetails({
  userProfile,
  user,
  toggleProfileRefresh,
  setToggleProfileRefresh,
}) {
  const STORAGE_USERUPLOADS_REF = "UserData/";
  const [fileInputValue, setFileInputValue] = useState("");
  const [fileInputFile, setFileInputFile] = useState("");
  const [showChangeDisplay, setShowChangeDisplay] = useState(false);

  console.log("toggleProfileRefresh", toggleProfileRefresh);

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
            setShowChangeDisplay(false);
          }
        );
      }
    );
  };

  const setUserPicture = async (url) => {
    // save photo url to db and toggle photo refresh
    await axios.put(`${BACKEND_URL}/users/profile/photo`, {
      email: user.email,
      profilePictureUrl: url,
    });
    setToggleProfileRefresh(!toggleProfileRefresh);
  };

  return (
    <div className="profile-container ">
      <div>
        <div>
          {userProfile.profilePictureUrl || user.picture ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  userProfile.profilePictureUrl
                    ? userProfile.profilePictureUrl
                    : user.picture
                }
                alt="Profile"
                className="profile-picture"
              />
              <Button
                onClick={() => setShowChangeDisplay(true)}
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--neutral-dark)",
                  border: "1px solid #2b2b2b",
                }}
                startIcon={<EditIcon />}
              >
                {" "}
                Update Photo
              </Button>
            </div>
          ) : (
            <img src={user.picture} alt="user" className="profile-picture" />
          )}
        </div>
        <div>
          Display Name: {userProfile?.name} <br />
          Email: {userProfile?.email}
          <br />
          Joined: {userProfile.createdAt?.slice(0, 10)}
        </div>
      </div>
      <Modal
        open={showChangeDisplay}
        onClose={() => {
          setShowChangeDisplay(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <form onSubmit={handlePostSubmit}>
            <div className="inputContainer">
              <label>
                <input
                  className="inputTag"
                  type="file"
                  value={fileInputValue}
                  onChange={(e) => {
                    setFileInputFile(e.target.files[0]);
                    setFileInputValue(e.target.files[0].name);
                  }}
                />
              </label>
            </div>
            <Button
              type="submit"
              style={{
                marginTop: "10px",
                backgroundColor: "#2b2b2b",
                color: "white",
              }}
            >
              Update
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default UserDetails;
