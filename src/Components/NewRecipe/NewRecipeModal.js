import React, { useState } from "react";
import {
  Modal,
  ButtonGroup,
  Button,
  Typography,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import RecipePartialSurprise from "./RecipePartialSurprise";
import BACKEND_URL from "../../constants";
import "./LoadingSpinner.css";
import PasteRecipeModal from "./RecipeFromUserInput";
import "./NewRecipeModal.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AssistantIcon from "@mui/icons-material/Assistant";

function MySpeedDial({
  setOpenRecipePartialSurprise,
  setOpenUserInputRecipe,
  open,
  setOpen,
}) {
  // const [open, setOpen] = useState(false);
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
    { icon: <AssistantIcon />, name: "Surprise Me", onClick: () => {} },
  ];

  return (
    <div
    //  style={{ position: "relative", width: "fit-content" }}
    >
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
      <Typography
        variant="caption"
        display="block"
        // gutterBottom
        mt={1}
        // style={{ textAlign: "center", marginTop: 8 }}
      >
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

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const accessToken = true;
  const userId = 1;

  // code to generate a random recipe
  async function handleTotalSurprise() {
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
        right: "35px",
        textAlign: "center",
      }}
    >
      {/* Buttons for the 3 options */}
      <MySpeedDial
        setOpenRecipePartialSurprise={setOpenRecipePartialSurprise}
        setOpenUserInputRecipe={setOpenUserInputRecipe}
        open={open}
        setOpen={setOpen}
      />

      {/* option selector - TO DELETE*/}
      <Modal
        // open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            width: 400,
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <ButtonGroup
            variant="text"
            color="primary"
            fullWidth
            aria-label="text primary button group"
          >
            <Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenUserInputRecipe(true);
                }}
              >
                <div style={{ fontSize: "40px" }}>📋</div>{" "}
                {/* Replace with your Paste Text icon */}
                <Typography>Paste Recipe</Typography>
              </div>
            </Button>
            <Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenRecipePartialSurprise(true);
                }}
              >
                <div style={{ fontSize: "40px" }}>🌐</div>{" "}
                {/* Replace with your Web Browsing icon */}
                <Typography>Some Help</Typography>
              </div>
            </Button>
            <Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => {
                  handleTotalSurprise();
                }}
              >
                <div style={{ fontSize: "40px" }}>🎁</div>{" "}
                {/* Replace with your Mystery Box icon */}
                <Typography>Surprise me!</Typography>
              </div>
            </Button>
          </ButtonGroup>
        </div>
      </Modal>

      {/* partial surprise modal */}
      <RecipePartialSurprise
        openRecipePartialSurprise={openRecipePartialSurprise}
        setOpenRecipePartialSurprise={setOpenRecipePartialSurprise}
      />

      <PasteRecipeModal
        openUserInputRecipe={openUserInputRecipe}
        setOpenUserInputRecipe={setOpenUserInputRecipe}
      />

      {isLoading && (
        <div className="loading-overlay">
          <img
            src="https://cdn.dribbble.com/users/2243442/screenshots/11362056/media/c9432283d2d6ba1a23f2fcd6169f2983.gif"
            alt="Loading..."
            style={{ borderRadius: "10px" }}
          />

          <div
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
            {/* {currentPhrase} */}
          </div>
        </div>
      )}
    </div>
  );
}
