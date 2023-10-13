import React, { useState } from "react";
import { Typography, SpeedDial, SpeedDialAction } from "@mui/material";
import SuggestRecipeModal from "./SuggestRecipeModal";
import BACKEND_URL from "../../constants";
import "./LoadingGif.css";
import PasteRecipeModal from "./PasteRecipeModal";
import "./NewRecipeModal.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AssistantIcon from "@mui/icons-material/Assistant";
import makeOpenAiRequest from "./OpenAiRequest";

function MySpeedDial({
  setOpenRecipePartialSurprise,
  setOpenUserInputRecipe,
  open,
  setOpen,
  setIsLoading,
}) {
  const actions = [
    {
      icon: <ContentPasteIcon />,
      name: "Paste Recipe",
      onClick: () => {
        setOpenUserInputRecipe(true);
      },
    },
    {
      icon: <KeyboardIcon />,
      name: "Suggest Recipe",
      onClick: () => {
        setOpenRecipePartialSurprise(true);
      },
    },
    {
      icon: <AssistantIcon />,
      name: "Surprise Me",
      onClick: () => {
        const data = { type: "surprise" };
        makeOpenAiRequest(data, setIsLoading);
      },
    },
  ];

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<img src="/logo512.png" alt="logo" className="fabIcon" />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <Typography variant="caption" display="block" mt={1}>
        Add recipe
      </Typography>
    </div>
  );
}

export default function NewRecipeModal() {
  const [open, setOpen] = useState(false);
  const [openRecipePartialSurprise, setOpenRecipePartialSurprise] =
    useState(false);
  const [openUserInputRecipe, setOpenUserInputRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const accessToken = true;
  const userId = 1;
  const type = "surprise";

  // code to generate a random recipe
  async function handleTotalSurprise(type) {
    if (accessToken) {
      console.log("generate for userid", userId);
      // event.preventDefault();
      const cuisineType = "Random";
      const recipeParameters = {
        cuisineType,
      };

      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/recipes/partialsurprise`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(recipeParameters),
        });
        const newRecipeDetails = await response.json();
        if (newRecipeDetails && newRecipeDetails.error) {
        } else {
          // setRecipeDetails(newRecipeDetails);
          console.log("newRecipeDetails", newRecipeDetails);
          // const newItineraryId =
          //   newItineraryDetails[newItineraryDetails.length - 1].id;
          // setSelectedItinerary(newItineraryId);
        }
        // navigate(`/upcoming`);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
      handleClose();
    } else {
      alert("Login to create your preferred recipe!");
    }
  }

  // code to send chatgpt a chunk of text to organise into the recipe format

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "25px",
        textAlign: "center",
      }}
    >
      {/* Buttons for the 3 options */}
      <MySpeedDial
        setOpenRecipePartialSurprise={setOpenRecipePartialSurprise}
        setOpenUserInputRecipe={setOpenUserInputRecipe}
        open={open}
        setOpen={setOpen}
        setIsLoading={setIsLoading}
      />

      <SuggestRecipeModal
        openRecipePartialSurprise={openRecipePartialSurprise}
        setOpenRecipePartialSurprise={setOpenRecipePartialSurprise}
        setIsLoading={setIsLoading}
      />

      <PasteRecipeModal
        openUserInputRecipe={openUserInputRecipe}
        setOpenUserInputRecipe={setOpenUserInputRecipe}
        setIsLoading={setIsLoading}
      />

      {isLoading && (
        <div className="loading-overlay">
          <img
            src="https://cdn.dribbble.com/users/2243442/screenshots/11362056/media/c9432283d2d6ba1a23f2fcd6169f2983.gif"
            alt="Loading..."
            style={{ borderRadius: "10px" }}
          />

          {/* <div
            style={{
              position: "fixed", // Set the position to fixed
              top: "50%", // Vertically center
              left: "50%", // Horizontally center
              transform: "translate(-50%, 170px)", // Offset by 150px down
              color: "black",
              textAlign: "center",
              zIndex: 1,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            
          </div> */}
        </div>
      )}
    </div>
  );
}
