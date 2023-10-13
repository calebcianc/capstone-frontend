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
  Input,
  Typography,
} from "@mui/material";

import BACKEND_URL from "../../constants";

export default function RecipePartialSurprise({
  openRecipePartialSurprise,
  setOpenRecipePartialSurprise,
}) {
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("none");
  const [servings, setServings] = useState(1);
  const [prepTime, setPrepTime] = useState("30min");
  // const [recipeDetails, setRecipeDetails] = useState();

  useEffect(() => {
    console.log(mealType, cuisineType, dietaryRestrictions, servings, prepTime);
  }, [mealType, cuisineType, dietaryRestrictions, servings, prepTime]);

  const handleClose = () => {
    setOpenRecipePartialSurprise(false);
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
          // setRecipeDetails(newRecipeDetails);
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
      <Dialog open={openRecipePartialSurprise} onClose={handleClose}>
        <DialogTitle
          style={{
            backgroundColor: "#f7f4e8",
            color: "#2b2b2b",
            borderRadius: "16px 16px 0 0",
            fontWeight: "bold",
          }}
        >
          What'd you like to cook?
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

          <Box mt={2}>
            <Typography
              variant="h7"
              style={{ color: "#2b2b2b", fontWeight: "bold" }}
            >
              Serving Size
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                variant={servings === num ? "contained" : "outlined"}
                style={{
                  color: servings === num ? "#f7f4e8" : "#2b2b2b",
                  backgroundColor: servings === num ? "#48789d" : undefined,
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

          <Box mt={2}>
            <Typography
              variant="h7"
              style={{ color: "#2b2b2b", fontWeight: "bold" }}
            >
              Preparation Time
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            {["15min", "30min", "1hr", "1.5hr", "2hr"].map((label) => (
              <Button
                key={label}
                variant={prepTime === label ? "contained" : "outlined"}
                style={{
                  color: prepTime === label ? "#f7f4e8" : "#2b2b2b",
                  backgroundColor: prepTime === label ? "#48789d" : undefined,
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
              marginBottom: 10, // <- Added margin below here
              marginRight: 8, // <- Added margin right here
            }}
          >
            Generate Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
