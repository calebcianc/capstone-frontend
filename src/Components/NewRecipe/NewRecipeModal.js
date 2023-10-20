import "./LoadingGif.css";
import "../NewRecipe/FabIcon.css";
import React, { useEffect, useState } from "react";
import {
  Typography,
  SpeedDial,
  SpeedDialAction,
  Dialog,
  DialogContent,
  Button,
  Tooltip,
} from "@mui/material";
import SuggestRecipeModal from "./SuggestRecipeModal";
import PasteRecipeModal from "./PasteRecipeModal";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AssistantIcon from "@mui/icons-material/Assistant";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../constants";
import TypeRecipeModal from "./TypeRecipeModal";
import { useAuth0 } from "@auth0/auth0-react";
import Backdrop from "@mui/material/Backdrop";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import "./NewRecipeModal.css";

//custom hook with issues
async function makeOpenAiRequest(data, setIsLoading, setRecipeId) {
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
  setOpenTypeRecipeModal,
  open,
  setOpen,
  setIsLoading,
  setRecipeId,
}) {
  const { loginWithRedirect } = useAuth0();
  const accessToken = false;
  const [openDialog, setOpenDialog] = useState(false);
  const data = { type: "surprise", input: "" };
  const actions = [
    {
      icon: <CreateIcon />,
      name: "Manual",
      onClick: () => {
        setOpenTypeRecipeModal(true);
      },
    },
    {
      icon: <ContentPasteIcon />,
      name: "Paste",
      onClick: () => {
        if (!accessToken) {
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
        if (!accessToken) {
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
        if (!accessToken) {
          setOpenDialog(true);
          return;
        }
        makeOpenAiRequest(data, setIsLoading, setRecipeId);
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography
            component="h2"
            id="modal-title"
            textColor="inherit"
            mb={2}
            variant="h6"
            fontWeight="bold"
          >
            Hey there!
          </Typography>
          <Typography>Sign up / Log in to use this feature!</Typography>
          <br />
          <Button variant="contained" onClick={() => loginWithRedirect()}>
            Sign Up / Log In
          </Button>
        </DialogContent>
      </Dialog>
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
