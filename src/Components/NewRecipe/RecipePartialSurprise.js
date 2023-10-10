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
  ButtonGroup,
  Input,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
// import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import BACKEND_URL from "../../Test/Constants";

export default function RecipePartialSurprise() {
  const [open, setOpen] = useState(false);
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("none");
  const [servings, setServings] = useState(1);
  const [prepTime, setPrepTime] = useState("30min");
  const [recipeDetails, setRecipeDetails] = useState();

  useEffect(() => {
    console.log(mealType, cuisineType, dietaryRestrictions, servings, prepTime);
  }, [mealType, cuisineType, dietaryRestrictions, servings, prepTime]);

  const handleClose = () => {
    setOpen(false);
    setMealType("");
    setCuisineType("");
    setDietaryRestrictions("none");
    setServings(1);
    setPrepTime("30min");
  };

  const accessToken = true;
  const userId = 1;

  async function handleCreate(event) {
    if (accessToken) {
      console.log("generate for userid", userId);
      event.preventDefault();

      const recipeParameters = {
        mealType,
        cuisineType,
        dietaryRestrictions,
        servings,
        prepTime,
      };

      try {
        // setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/recipes/partialsurprise`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(recipeParameters),
        });
        const newRecipeDetails = await response.json();
        if (newRecipeDetails && newRecipeDetails.error) {
        } else {
          setRecipeDetails(newRecipeDetails);
          console.log("newRecipeDetails", newRecipeDetails);
          // const newItineraryId =
          //   newItineraryDetails[newItineraryDetails.length - 1].id;
          // setSelectedItinerary(newItineraryId);
        }
        // navigate(`/upcoming`);
        // setIsLoading(false);
      } catch (error) {
        // setIsLoading(false);
      }
      handleClose();
    } else {
      alert("Login to create your preferred recipe!");
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open Recipe Generator
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            backgroundColor: "#f7f4e8",
            color: "#2b2b2b",
            borderRadius: "16px 16px 0 0",
          }}
        >
          Recipe Parameters
        </DialogTitle>

        <DialogContent style={{ backgroundColor: "#f7f4e8" }}>
          {/* Meal Type */}
          <TextField
            select
            fullWidth
            margin="dense"
            label="Meal Type"
            variant="outlined"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            style={{ backgroundColor: "#d5d4d0" }}
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
            style={{ backgroundColor: "#d5d4d0" }}
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
            style={{ backgroundColor: "#d5d4d0" }}
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

          <Typography
            variant="h7"
            style={{ color: "#2b2b2b", marginBottom: 8 }}
          >
            Serving Size
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                variant="outlined"
                style={{
                  color: "#2b2b2b",
                  borderColor: "#2b2b2b",
                  borderRadius: "16px",
                  flex: 1,
                  margin: 4,
                }}
                onClick={() => {
                  setServings(num);
                }}
              >
                {num}
              </Button>
            ))}
            <Input
              type="number"
              inputProps={{ min: 6 }}
              style={{
                backgroundColor: "#d5d4d0",
                borderRadius: "16px",
                width: 60,
                marginLeft: 4,
              }}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value > 5) {
                  setServings(value);
                }
              }}
            />
          </Box>

          <Typography
            variant="h7"
            style={{ color: "#2b2b2b", marginBottom: 8 }}
          >
            Preparation Time
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            {["15min", "30min", "1hr", "1.5hr", "2hr"].map((label) => (
              <Button
                key={label}
                variant="outlined"
                style={{
                  color: "#2b2b2b",
                  borderColor: "#2b2b2b",
                  borderRadius: "16px",
                  flex: 1,
                  margin: 4,
                }}
                onClick={() => {
                  setPrepTime(label);
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </DialogContent>

        <DialogActions
          style={{ backgroundColor: "#f7f4e8", borderRadius: "0 0 16px 16px" }}
        >
          <Button onClick={handleClose} style={{ color: "#e7372d" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            style={{
              backgroundColor: "#2b2b2b",
              color: "#f7f4e8",
              borderRadius: "16px",
            }}
          >
            Generate Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
