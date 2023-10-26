// Libraries and Frameworks
import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  SpeedDial,
  SpeedDialAction,
  Dialog,
  DialogContent,
  Button,
  Tooltip,
} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AssistantIcon from "@mui/icons-material/Assistant";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Backdrop from "@mui/material/Backdrop";

// Internal Modules, Components, and Constants
import SuggestRecipeModal from "./SuggestRecipeModal";
import PasteRecipeModal from "./PasteRecipeModal";
import { BACKEND_URL } from "../../constants";
import TypeRecipeModal from "./TypeRecipeModal";
import { GlobalUseContext } from "../../GlobalUseContext";
import AuthDialog from "../Auth/AuthDialog";

// Styles
import "./LoadingGif.css";
import "./NewRecipeModal.css";
import "../NewRecipe/FabIcon.css";

//custom hook with issues
async function makeOpenAiRequest(
  data,
  setIsLoading,
  setRecipeId,
  userProfile,
  isAuthenticated
) {
  data.userId = userProfile.id;
  data.cuisinePreferences = userProfile.cuisinePreferences;
  data.userDietaryRestrictions = userProfile.dietaryRestrictions;
  console.log("Sending data: ", data);

  if (isAuthenticated) {
    console.log("generate for userid", userProfile.id);
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
  setOpenTypeRecipeModal,
  open,
  setOpen,
  setIsLoading,
  setRecipeId,
}) {
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  const { loginWithRedirect } = useAuth0();
  const [openDialog, setOpenDialog] = useState(false);
  const data = { type: "surprise", input: "" };
  const actions = [
    {
      icon: <CreateIcon />,
      name: "Manual",
      onClick: () => {
        if (!isAuthenticated) {
          setOpenDialog(true);
          return;
        }
        setOpenTypeRecipeModal(true);
      },
    },
    {
      icon: <ContentPasteIcon />,
      name: "Paste",
      onClick: () => {
        if (!isAuthenticated) {
          setOpenDialog(true);
          return;
        }
        setOpenUserInputRecipe(true);
      },
    },
    {
      icon: <KeyboardIcon />,
      name: "Suggest",
      onClick: () => {
        if (!isAuthenticated) {
          setOpenDialog(true);
          return;
        }
        setOpenRecipePartialSurprise(true);
      },
    },

    {
      icon: <AssistantIcon />,
      name: "Surprise",
      onClick: () => {
        if (!isAuthenticated) {
          setOpenDialog(true);
          return;
        }
        makeOpenAiRequest(
          data,
          setIsLoading,
          setRecipeId,
          userProfile,
          isAuthenticated
        );
      },
    },
  ];

  return (
    <div className="fab-container">
      {/* <Backdrop open={open} /> */}
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
            tooltipOpen
            TooltipClasses={{ tooltip: "speed-dial-tooltip" }}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <Typography variant="caption" display="block" mt={1}>
        <b>ADD RECIPE</b>
      </Typography>

      <AuthDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
}

export default function NewRecipeModal() {
  const [open, setOpen] = useState(false);
  const [openRecipePartialSurprise, setOpenRecipePartialSurprise] =
    useState(false);
  const [openTypeRecipeModal, setOpenTypeRecipeModal] = useState(false);
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
        setOpenTypeRecipeModal={setOpenTypeRecipeModal}
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

      <TypeRecipeModal
        openTypeRecipeModal={openTypeRecipeModal}
        setOpenTypeRecipeModal={setOpenTypeRecipeModal}
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
