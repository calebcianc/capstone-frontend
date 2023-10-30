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
  userRecipe,
}) {
  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // January is 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <div className="preference-container">
        <div className="preference-text">
          <div className="preference-title">Cuisine Preferences:</div>
          <div>{userProfile?.cuisinePreferences}</div>
        </div>
        <div>
          {userProfile.cuisinePreferences && toggleShowSubmit && (
            <EditCuisinePreferences
              preloadCuisinePreferences={userProfile?.cuisinePreferences}
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
              Edit
            </Button>
          )}
        </div>
      </div>
      <div className="preference-container">
        <div className="preference-text">
          <div className="preference-title">Dietary Restrictions:</div>
          <div>{userProfile?.dietaryRestrictions}</div>
        </div>
        <div>
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
      </div>
      <div className="cookbook-container">
        <div className="preference-text">
          <div className="preference-title"> Cookbook History</div>

          <div style={{ fontSize: "13px" }}>
            {userProfile && userRecipe.length > 0 ? (
              userRecipe.map((recipe, index) => (
                <div key={index}>
                  {recipe.name} - {formatDateToDDMMYYYY(recipe.lastCookedDate)}
                </div>
              ))
            ) : (
              <div>There are no last cooked items</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
