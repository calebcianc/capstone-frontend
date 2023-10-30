import React, { useState } from "react";
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
  const [isCuisineModalOpen, setIsCuisineModalOpen] = useState(false);
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);

  // cuisine
  const handleOpenCuisineModal = () => {
    setIsCuisineModalOpen(true);
  };
  const handleCloseCuisineModal = () => {
    setIsCuisineModalOpen(false);
  };

  // dietary
  const handleOpenDietModal = () => {
    setIsDietModalOpen(true);
  };
  const handleCloseDietModal = () => {
    setIsDietModalOpen(false);
  };

  return (
    <div>
      <div className="preference-container">
        <div className="preference-text">
          <div className="preference-title">Cuisine Preferences:</div>
          <div>{userProfile?.cuisinePreferences}</div>
        </div>

        <Button
          onClick={handleOpenCuisineModal}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--neutral-dark)",
            border: "1px solid #2b2b2b",
          }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <EditCuisinePreferences
          openModal={isCuisineModalOpen}
          handleCloseModal={handleCloseCuisineModal}
          preloadCuisinePreferences={userProfile?.cuisinePreferences}
          userId={userProfile?.id}
          toggleProfileRefresh={toggleProfileRefresh}
          setToggleProfileRefresh={setToggleProfileRefresh}
          setToggleShowEdit={setToggleShowEdit}
          toggleShowSubmit={toggleShowSubmit}
          setToggleShowSubmit={setToggleShowSubmit}
        />
      </div>
      <div className="preference-container">
        <div className="preference-text">
          <div className="preference-title">Dietary Restrictions:</div>
          <div>{userProfile?.dietaryRestrictions}</div>
        </div>
        <Button
          onClick={handleOpenDietModal}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "var(--neutral-dark)",
            border: "1px solid #2b2b2b",
          }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <EditDietaryRestrictions
          openModal={isDietModalOpen}
          handleCloseModal={handleCloseDietModal}
          preloadDietaryRestrictions={userProfile?.dietaryRestrictions}
          userId={userProfile?.id}
          toggleProfileRefresh={toggleProfileRefresh}
          setToggleProfileRefresh={setToggleProfileRefresh}
          setToggleShowEdit={setToggleShowEdit1}
          toggleShowSubmit={toggleShowSubmit1}
          setToggleShowSubmit={setToggleShowSubmit1}
        />
      </div>
      <div className="cookbook-container">
        <div className="preference-text">
          <div className="preference-title"> Cookbook History</div>
          <div style={{ fontSize: "13px" }}>
            {userProfile && userRecipe.length > 0 ? (
              userRecipe.map((recipe, index) => (
                <div key={index} className="recipe-item">
                  <div>{recipe.name}</div>
                  <div>{formatDateToDDMMYYYY(recipe.lastCookedDate)}</div>
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
