import React from "react";
import Button from "@mui/material/Button";
import EditCuisinePreferences from "./EditCuisinePreferences";
import EditDietaryRestrictions from "./EditDietaryRestrictions";
import EditIcon from "@mui/icons-material/Edit";

function UserDashboard({
  userProfile,
  toggleShowSubmit,
  setToggleShowSubmit,
  toggleShowEdit,
  setToggleShowEdit,
  toggleProfileRefresh,
  setToggleProfileRefresh,
  toggleShowSubmit1,
  setToggleShowSubmit1,
  toggleShowEdit1,
  setToggleShowEdit1,
}) {
  return (
    <div className="dashboard-container">
      <div className="preference-container">
        Cusine Preferences:
        {userProfile?.cusinePreferences} <br />
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
            onClick={() => {
              setToggleShowEdit(!toggleShowEdit);
              setToggleShowSubmit(!toggleShowSubmit);
            }}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--neutral-dark)",
              border: "1px solid #2b2b2b",
            }}
            startIcon={<EditIcon />}
          >
            {" "}
            Edit
          </Button>
        )}
      </div>
      <div className="preference-container">
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
        )}
        {toggleShowEdit1 && (
          <Button
            onClick={() => {
              setToggleShowEdit1(!toggleShowEdit1);
              setToggleShowSubmit1(!toggleShowSubmit1);
            }}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--neutral-dark)",
              border: "1px solid #2b2b2b",
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="cookbook-container ">cookbook history</div>
    </div>
  );
}

export default UserDashboard;
