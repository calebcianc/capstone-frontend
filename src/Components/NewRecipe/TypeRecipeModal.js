import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import "./SuggestRecipeModal.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../constants";

async function makeOpenAiRequest(data, setIsLoading, setRecipeId, event) {
  if (event) {
    event.preventDefault();
  }

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

export default function TypeRecipeModal({
  openTypeRecipeModal,
  setOpenTypeRecipeModal,
  setIsLoading,
}) {
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("none");
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState(30);
  const navigate = useNavigate();
  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  }, [recipeId]);

  useEffect(() => {
    console.log(mealType, cuisineType, dietaryRestrictions, servings, prepTime);
  }, [mealType, cuisineType, dietaryRestrictions, servings, prepTime]);

  const handleClose = () => {
    setOpenTypeRecipeModal(false);
    setMealType("");
    setCuisineType("");
    setDietaryRestrictions("none");
    setServings(2);
    setPrepTime(30);
  };

  const handleSubmit = (event) => {
    const data = {
      type: "suggest",
      input: {
        mealType,
        cuisineType,
        dietaryRestrictions,
        servings,
        prepTime,
      },
    };
    makeOpenAiRequest(data, setIsLoading, setRecipeId, event);
    handleClose();
    console.log(JSON.stringify(data));
  };

  return (
    <div>
      <Dialog
        open={openTypeRecipeModal}
        onClose={handleClose}
        maxWidth="sm" // Set maximum width to medium (you can adjust this as needed)
        fullWidth
      >
        <DialogTitle
          style={{
            backgroundColor: "#f7f4e8",
            color: "#2b2b2b",
            borderRadius: "16px",
            fontWeight: "bold",
          }}
        >
          Key in every detail of your recipe!
        </DialogTitle>

        <DialogContent style={{ backgroundColor: "#f7f4e8", paddingBottom: 0 }}>
          {/* Meal Type */}
          <TextField
            select
            fullWidth
            margin="dense"
            label="Meal Type"
            variant="outlined"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            style={{ backgroundColor: "white" }}
          >
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
          </TextField>

          {/* Cuisine Type */}
          <TextField
            select
            fullWidth
            margin="dense"
            label="Cuisine Type"
            variant="outlined"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            style={{ backgroundColor: "white" }}
          >
            <MenuItem value="italian">Italian</MenuItem>
            <MenuItem value="chinese">Chinese</MenuItem>
            <MenuItem value="japanese">Japanese</MenuItem>
            <MenuItem value="mexican">Mexican</MenuItem>
            <MenuItem value="french">French</MenuItem>
            <MenuItem value="indian">Indian</MenuItem>
            <MenuItem value="thai">Thai</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="korean">Korean</MenuItem>
            <MenuItem value="american">American</MenuItem>
          </TextField>

          {/* Dietary Restrictions */}
          <TextField
            select
            fullWidth
            margin="dense"
            label="Dietary Restrictions"
            variant="outlined"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            style={{ backgroundColor: "white" }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="gluten-free">Gluten-Free</MenuItem>
            <MenuItem value="dairy-free">Dairy-Free</MenuItem>
            <MenuItem value="nut-free">Nut-Free</MenuItem>
            <MenuItem value="halal">Halal</MenuItem>
            <MenuItem value="kosher">Kosher</MenuItem>
            <MenuItem value="paleo">Paleo</MenuItem>
            <MenuItem value="keto">Keto</MenuItem>
            <MenuItem value="low-carb">Low Carb</MenuItem>
          </TextField>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
              backgroundColor: "white",
              margin: "8px 0",
              padding: "6px 0",
            }}
          >
            <Box flex="0 1 50%" textAlign="left">
              <Typography
                variant="h7"
                style={{
                  color: "#2b2b2b",

                  marginLeft: "8px",
                }}
              >
                Serving Size
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                onClick={() => setServings((prev) => Math.max(1, prev - 1))} // Decrease but not below 1
                className="button"
              >
                -
              </Button>
              <Typography>{servings} pax</Typography>
              <Button
                onClick={() => setServings((prev) => prev + 1)} // Increase serving size
                className="button"
              >
                +
              </Button>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
              backgroundColor: "white",
              margin: "12px 0 4px 0",
              padding: "6px 0",
            }}
          >
            <Box flex="0 1 50%" textAlign="left">
              <Typography
                variant="h7"
                style={{
                  color: "#2b2b2b",
                  marginLeft: "8px",
                }}
              >
                Preparation Time
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                onClick={() => setPrepTime((prev) => Math.max(15, prev - 15))} // Decrease by 15 but not below 15
                className="button"
              >
                -
              </Button>
              <Typography>{prepTime} mins</Typography>
              <Button
                onClick={() => setPrepTime((prev) => prev + 15)} // Increase prep time by 15
                className="button"
              >
                +
              </Button>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          style={{
            backgroundColor: "#f7f4e8",
            borderRadius: "0 0 16px 16px",
            padding: "16px 24px 16px 24px",
          }}
        >
          <Button onClick={handleClose} style={{ color: "#e7372d" }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              backgroundColor: "#2b2b2b",
              color: "#f7f4e8",
              borderRadius: "16px",
            }}
            endIcon={<RestartAltIcon />}
            disabled={mealType === "" || cuisineType === ""}
          >
            Generate Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
