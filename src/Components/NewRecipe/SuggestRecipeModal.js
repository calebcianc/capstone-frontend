import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  FormControlLabel,
  Checkbox,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { GlobalUseContext } from "../../GlobalUseContext";
import "./SuggestRecipeModal.css";
import BACKEND_URL from "../../constants";

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
  data.cusinePreferences = userProfile.cusinePreferences;
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

export default function SuggestRecipeModal({
  openRecipePartialSurprise,
  setOpenRecipePartialSurprise,
  setIsLoading,
}) {
  const navigate = useNavigate();
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("none");
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState(30);
  const [recipeId, setRecipeId] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);

  useEffect(() => {
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  }, [recipeId]);

  useEffect(() => {
    console.log(mealType, cuisineType, dietaryRestrictions, servings, prepTime);
  }, [mealType, cuisineType, dietaryRestrictions, servings, prepTime]);

  const handleClose = () => {
    setOpenRecipePartialSurprise(false);
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
      isPublic,
    };
    makeOpenAiRequest(
      data,
      setIsLoading,
      setRecipeId,
      event,
      userProfile,
      isAuthenticated
    );
    handleClose();
    console.log(JSON.stringify(data));
  };

  return (
    <div>
      <Dialog
        open={openRecipePartialSurprise}
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
          What'd you like to cook?
        </DialogTitle>

        <DialogContent style={{ backgroundColor: "#f7f4e8", paddingBottom: 0 }}>
          <Grid container spacing={2}>
            {/* Meal Type */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                margin="dense"
                label="Meal Type"
                variant="outlined"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                style={{ backgroundColor: "white" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalCafeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
              </TextField>
            </Grid>

            {/* Cuisine Type */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                margin="dense"
                label="Cuisine Type"
                variant="outlined"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                style={{ backgroundColor: "white" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RestaurantMenuIcon color="action" />
                    </InputAdornment>
                  ),
                }}
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
            </Grid>

            {/* Dietary Restrictions */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                margin="dense"
                label="Dietary Restrictions"
                variant="outlined"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                style={{ backgroundColor: "white" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalDiningIcon color="action" />
                    </InputAdornment>
                  ),
                }}
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
            </Grid>
          </Grid>

          {/* Serving Size and Preparation Time */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
              backgroundColor: "white",
              margin: "10px 0 8px 0",
              padding: "10px 0 6px 0",
            }}
          >
            {/* Serving Size Group */}
            <Box
              flex="1"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                borderRight: "1px solid #2b2b2b", // Optional: adds a border between the two groups
                padding: "0 8px", // Optional: adds some padding
              }}
            >
              <Typography
                variant="h7"
                style={{
                  color: "#2b2b2b",
                  fontWeight: "bold",
                  marginBottom: "4px", // Adjusts spacing between label and controls
                }}
              >
                Serving Size
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => setServings((prev) => Math.max(1, prev - 1))} // Decrease but not below 1
                  className="button"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography>{servings} pax</Typography>
                <IconButton
                  onClick={() => setServings((prev) => prev + 1)} // Increase serving size
                  className="button"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Preparation Time Group */}
            <Box
              flex="1"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                padding: "0 8px", // Optional: adds some padding
              }}
            >
              <Typography
                variant="h7"
                style={{
                  color: "#2b2b2b",
                  fontWeight: "bold",
                  marginBottom: "4px", // Adjusts spacing between label and controls
                }}
              >
                Preparation Time
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => setPrepTime((prev) => Math.max(15, prev - 15))} // Decrease by 15 but not below 15
                  className="button"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography>{prepTime} mins</Typography>
                <IconButton
                  onClick={() => setPrepTime((prev) => prev + 15)} // Increase prep time by 15
                  className="button"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

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
            padding: "16px 24px 24px 24px",
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
