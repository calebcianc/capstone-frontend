import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../constants";
import { GlobalUseContext } from "../../GlobalUseContext";

//custom hook with issues
async function makeOpenAiRequest(
  data,
  setIsLoading,
  setRecipeId,
  event,
  userProfile,
  isAuthenticated
) {
  if (event) {
    event.preventDefault();
  }

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

function PasteRecipeModal({
  openUserInputRecipe,
  setOpenUserInputRecipe,
  setIsLoading,
}) {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [recipeId, setRecipeId] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);

  useEffect(() => {
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  }, [recipeId]);

  const handleSubmit = () => {
    const data = { type: "paste", input: text };
    makeOpenAiRequest(
      data,
      setIsLoading,
      setRecipeId,
      userProfile,
      isAuthenticated
    );
    handleClose();
    console.log(text);
  };

  const handleClose = () => {
    setText("");
    setOpenUserInputRecipe(false);
  };

  return (
    <div>
      <Dialog
        open={openUserInputRecipe}
        onClose={handleClose}
        maxWidth="sm" // Set maximum width to medium (you can adjust this as needed)
        fullWidth // Make the dialog take up full width
      >
        <DialogTitle
          style={{
            backgroundColor: "#f7f4e8",
            color: "#2b2b2b",
            borderRadius: "16px 16px 0 0",
            fontWeight: "bold",
          }}
        >
          We'll try to keep it a secret!
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#f7f4e8", paddingBottom: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            placeholder="Paste your recipe here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ backgroundColor: "white" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              marginLeft: "-8px",
            }}
          >
            <FormControlLabel
              labelPlacement="start"
              label={
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  Make recipe public?
                </Typography>
              }
              control={
                <Checkbox
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  name="isPublic"
                  color="default"
                />
              }
            />
          </div>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: "#f7f4e8",
            borderRadius: "0 0 16px 16px",
            padding: "16px 24px",
          }}
        >
          <Button onClick={handleClose} style={{ color: "#e7372d" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2b2b2b",
              color: "#f7f4e8",
              borderRadius: "16px",
            }}
            color="primary"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            endIcon={<CloudUploadIcon />}
            disabled={text === ""}
          >
            Upload Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PasteRecipeModal;
