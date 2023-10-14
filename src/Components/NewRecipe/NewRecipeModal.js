import "./LoadingGif.css";
import "../NewRecipe/FabIcon.css";
import React, { useEffect, useState } from "react";
import { Typography, SpeedDial, SpeedDialAction } from "@mui/material";
import SuggestRecipeModal from "./SuggestRecipeModal";
import PasteRecipeModal from "./PasteRecipeModal";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AssistantIcon from "@mui/icons-material/Assistant";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../constants";

//custom hook with issues
async function makeOpenAiRequest(data, setIsLoading, setRecipeId) {
  // if (event) {
  //   event.preventDefault();
  // }

  const accessToken = true;
  const userId = 1;
  data.userId = userId;
  console.log("Sending data: ", data);

  if (accessToken) {
    console.log("generate for userid", userId);
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/recipes/new`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const newRecipeDetails = await response.json();
      if (newRecipeDetails && newRecipeDetails.error) {
        console.error("Error:", newRecipeDetails.error);
      } else {
        console.log("newRecipeDetails", JSON.stringify(newRecipeDetails));
        console.log("newRecipeDetails.id", newRecipeDetails.id);
        setRecipeId(newRecipeDetails.id);
        // navigate(`/recipes/${newRecipeDetails.id}`);
      }
      setIsLoading(false);
      return newRecipeDetails;
    } catch (error) {
      setIsLoading(false);

      console.error("Error while fetching:", error);
      throw error;
    }
  } else {
    alert("Login to create your preferred recipe!");
  }
}

function MySpeedDial({
  setOpenRecipePartialSurprise,
  setOpenUserInputRecipe,
  open,
  setOpen,
  setIsLoading,
  setRecipeId,
}) {
  const data = { type: "surprise", input: "" };
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
        makeOpenAiRequest(data, setIsLoading, setRecipeId);
      },
    },
  ];

  return (
    <div className="fab-container">
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<img src="/logo512.png" alt="logo" className="fab-icon" />}
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
        <b>ADD RECIPE</b>
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
  const [recipeId, setRecipeId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  }, [recipeId]);

  return (
    <>
      {/* Buttons for the 3 options */}
      <MySpeedDial
        setOpenRecipePartialSurprise={setOpenRecipePartialSurprise}
        setOpenUserInputRecipe={setOpenUserInputRecipe}
        open={open}
        setOpen={setOpen}
        setIsLoading={setIsLoading}
        setRecipeId={setRecipeId}
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
            style={{ borderRadius: "10px", height: "500px" }}
          />
        </div>
      )}
    </>
  );
}
