import React from "react";
import Button from "@mui/material/Button";
import EditCuisinePreferences from "./EditCuisinePreferences";
import EditDietaryRestrictions from "./EditDietaryRestrictions";

function UserPreferences({
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
    <div>
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
      )}
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
      )}
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
  );
}

export default UserPreferences;
