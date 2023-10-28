// external imports
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  InputAdornment,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

// internal imports
import { BACKEND_URL } from "../../constants";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { GlobalUseContext } from "../../GlobalUseContext";

// styles
import "./SuggestRecipeModal.css";

const STORAGE_PROFILE_FOLDER_NAME = "UserData";

async function addRecipeToDatabase(
  data,
  setIsLoading,
  setRecipeId,
  event,
  userProfile,
  isAuthenticated,
  recipe,
  setCounter
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

      const url = recipe
        ? `${BACKEND_URL}/recipes/updateRecipe/${recipe.id}`
        : `${BACKEND_URL}/recipes/addRecipe`;
      const method = recipe ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const newRecipeDetails = await response.json();
      if (newRecipeDetails && newRecipeDetails.error) {
        console.error("Error:", newRecipeDetails.error);
      } else {
        console.log("newRecipeDetails", JSON.stringify(newRecipeDetails));
        console.log("newRecipeDetails.id", newRecipeDetails.id);

        if (data.recipe.recipePhoto) {
          const fileRef = storageRef(
            storage,
            `${STORAGE_PROFILE_FOLDER_NAME}/${userProfile.id}/recipe/${newRecipeDetails.id}/recipeImage/1`
          );

          try {
            const snapshot = await uploadBytes(
              fileRef,
              data.recipe.recipePhoto
            );
            const recipePhotoUrl = await getDownloadURL(snapshot.ref);
            console.log("retrieve recipePhotoUrl", recipePhotoUrl);

            // Call the saveImageUrlToPostgreSQL function
            await saveImageUrlToPostgreSQL(recipePhotoUrl, newRecipeDetails.id);
          } catch (error) {
            console.error(
              "Error uploading file or getting download URL:",
              error
            );
          }
        }

        // add code below to loop through each instruction and uploading the image to firebase & writing the url to postgresql
        let stepNumber = 1;
        for (const instruction of data.recipe.instructions) {
          if (instruction.image) {
            const fileRef = storageRef(
              storage,
              `${STORAGE_PROFILE_FOLDER_NAME}/${userProfile.id}/recipe/${newRecipeDetails.id}/instructionImage/${instruction.step}/${instruction.image.name}`
            );

            try {
              const snapshot = await uploadBytes(fileRef, instruction.image);
              const instructionPhotoUrl = await getDownloadURL(snapshot.ref);
              console.log("retrieve instructionPhotoUrl", instructionPhotoUrl);

              // Call the saveImageUrlToPostgreSQL function
              await saveImageUrlToPostgreSQL(
                instructionPhotoUrl,
                newRecipeDetails.id,
                stepNumber
              );
            } catch (error) {
              console.error(
                "Error uploading file or getting download URL:",
                error
              );
            }
          }
          stepNumber++;
        }
        setRecipeId(newRecipeDetails.id);
      }
      setCounter((prev) => prev + 1);
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

async function saveImageUrlToPostgreSQL(imageUrl, recipeId, stepNumber) {
  try {
    let response;
    if (stepNumber) {
      response = await fetch(
        `${BACKEND_URL}/instructions/saveImageUrl/${recipeId}/${stepNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photoUrl: imageUrl,
          }),
        }
      );
    } else {
      response = await fetch(
        `${BACKEND_URL}/recipes/saveImageUrl/${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeImageUrl: imageUrl,
          }),
        }
      );
    }

    if (response.ok) {
      console.log("Image URL saved in PostgreSQL.");
    } else {
      console.error("Failed to save image URL in PostgreSQL.");
    }
  } catch (error) {
    console.error("Error saving image URL in PostgreSQL:", error);
  }
}

export default function TypeRecipeModal({
  openTypeRecipeModal,
  setOpenTypeRecipeModal,
  setIsLoading,
  recipe,
  setCounter,
}) {
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  const navigate = useNavigate();
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("none");
  const [servings, setServings] = useState(2);
  const [prepTime, setPrepTime] = useState(30);
  const [recipeId, setRecipeId] = useState();

  const [name, setName] = useState("");
  const [recipePhoto, setRecipePhoto] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [recipeImage, setRecipeImage] = useState(null);
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unitOfMeasurement: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { instruction: "", timeInterval: "", image: null },
  ]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
      setServings(recipe.servingSize);
      setPrepTime(recipe.totalTime);
      setCuisineType(recipe.cuisine);
      setDietaryRestrictions(recipe.dietaryRestrictions);
      setIsPublic(recipe.isPublic);
    }
  }, [recipe]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unitOfMeasurement: "" },
    ]);
  };

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { instruction: "", timeInterval: "", image: null },
    ]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const removeInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  useEffect(() => {
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  }, [recipeId]);

  // useEffect(() => {
  //   console.log(mealType, cuisineType, dietaryRestrictions, servings, prepTime);
  // }, [mealType, cuisineType, dietaryRestrictions, servings, prepTime]);

  const handleClose = () => {
    setOpenTypeRecipeModal(false);
    if (!recipe) {
      setName("");
      setCuisineType("");
      setDietaryRestrictions("none");
      setServings(2);
      setPrepTime(30);
      setIngredients([{ name: "", quantity: "", unitOfMeasurement: "" }]);
      setInstructions([{ instruction: "", timeInterval: "", image: null }]);
    }
  };

  const handleSubmit = (event) => {
    const data = {
      recipe: {
        name,
        recipePhoto,
        prepTime,
        isPublic,
        cuisineType,
        dietaryRestrictions,
        ingredients,
        instructions,
      },
    };
    addRecipeToDatabase(
      data,
      setIsLoading,
      setRecipeId,
      event,
      userProfile,
      isAuthenticated,
      recipe,
      setCounter
    );
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
            fontSize: "1.35em",
          }}
        >
          {recipe ? "Update your recipe" : "Key in your recipe!"}
        </DialogTitle>

        <DialogContent style={{ backgroundColor: "#f7f4e8", paddingBottom: 0 }}>
          {/* Recipe name */}
          <div style={{ display: "flex", marginBottom: "6px" }}>
            <TextField
              fullWidth
              margin="dense"
              label="Recipe Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: "white" }}
            />{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
                margin: "8px 0 4px 0",
                // padding: "5px",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="recipe-image-input"
                type="file"
                onChange={(e) => setRecipePhoto(e.target.files[0])}
              />
              <label htmlFor="recipe-image-input">
                <AddPhotoAlternateIcon style={{ cursor: "pointer" }} />
              </label>
              <Typography variant="caption">Add photo</Typography>
            </div>
          </div>

          <Grid container spacing={2}>
            {/* Meal Type */}
            {/* <Grid item xs={12} sm={4}>
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
            </Grid> */}

            {/* Cuisine Type */}
            <Grid item xs={12} sm={6}>
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
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Thai">Thai</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Korean">Korean</MenuItem>
                <MenuItem value="American">American</MenuItem>
              </TextField>
            </Grid>

            {/* Dietary Restrictions */}
            <Grid item xs={12} sm={6}>
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
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Gluten-free">Gluten-Free</MenuItem>
                <MenuItem value="Dairy-free">Dairy-Free</MenuItem>
                <MenuItem value="Nut-free">Nut-Free</MenuItem>
                <MenuItem value="Halal">Halal</MenuItem>
                <MenuItem value="Kosher">Kosher</MenuItem>
                <MenuItem value="Paleo">Paleo</MenuItem>
                <MenuItem value="Keto">Keto</MenuItem>
                <MenuItem value="Low-carb">Low Carb</MenuItem>
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

          {/* List of Ingredients */}
          <Box>
            <div
              style={{
                fontSize: "1.1em",
                fontWeight: "bold",
                padding: "5px 0 5px 8px",
              }}
            >
              Ingredients
            </div>
            {ingredients?.map((ingredient, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                style={{
                  backgroundColor: "white",
                  padding: "8px ",
                  borderRadius: "4px",
                  height: "40px",
                }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  style={{
                    flex: 2,
                    marginRight: "8px",
                    backgroundColor: "white",
                  }}
                  InputProps={{
                    style: { height: 40, padding: "5px" },
                  }}
                  InputLabelProps={{
                    style: { top: "-6px" },
                  }}
                />
                <TextField
                  label="Quantity"
                  variant="outlined"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].quantity = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  style={{
                    flex: 1,
                    marginRight: "8px",
                    backgroundColor: "white",
                  }}
                  InputProps={{
                    style: { height: 40, padding: "5px" },
                    type: "number",
                    step: "0.01",
                  }}
                  InputLabelProps={{
                    style: { top: "-6px" },
                  }}
                />
                <TextField
                  label="Unit of Measurement"
                  variant="outlined"
                  value={ingredient.unitOfMeasurement}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unitOfMeasurement = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  style={{ flex: 1, backgroundColor: "white" }}
                  InputProps={{
                    style: { height: 40, padding: "5px" },
                  }}
                  InputLabelProps={{
                    style: { top: "-6px" },
                  }}
                />
                <IconButton onClick={() => removeIngredient(index)}>
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Button
              style={{
                marginLeft: "5px",
                marginBottom: "8px",
                color: "#2b2b2b",
                fontSize: "0.7em",
              }}
              onClick={addIngredient}
              color="primary"
              startIcon=<AddCircleOutlineIcon />
            >
              Add ingredient
            </Button>
          </div>

          {/* List of Instructions */}
          <Box>
            <div
              style={{
                fontSize: "1.1em",
                fontWeight: "bold",
                padding: "5px 0 5px 8px",
              }}
            >
              Instructions
            </div>
            {instructions?.map((instruction, index) => (
              <Box
                style={{
                  backgroundColor: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  height: "40px",
                  display: "flex",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <TextField
                    label="Instruction"
                    variant="outlined"
                    value={instruction.instruction}
                    onChange={(e) => {
                      const newInstructions = [...instructions];
                      newInstructions[index].instruction = e.target.value;
                      setInstructions(newInstructions);
                    }}
                    style={{ flex: 3, marginRight: "8px" }}
                    InputProps={{
                      style: { height: 40, padding: "5px" },
                    }}
                    InputLabelProps={{
                      style: { top: "-6px" },
                    }}
                  />
                  <TextField
                    label="Time Taken"
                    variant="outlined"
                    type="number"
                    value={instruction.timeInterval}
                    onChange={(e) => {
                      const newInstructions = [...instructions];
                      newInstructions[index].timeInterval = e.target.value;
                      setInstructions(newInstructions);
                    }}
                    style={{ flex: 1, marginRight: "8px" }}
                    InputProps={{
                      style: { height: 40, padding: "5px" },
                    }}
                    InputLabelProps={{
                      style: { top: "-6px" },
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{
                        display: "none",
                      }}
                      id={`instruction-image-input-${index}`}
                      type="file"
                      onChange={(e) => {
                        const newInstructions = [...instructions];
                        newInstructions[index].image = e.target.files[0];
                        setInstructions(newInstructions);
                      }}
                    />
                    <label htmlFor={`instruction-image-input-${index}`}>
                      <AddPhotoAlternateIcon
                        style={{
                          cursor: "pointer",
                          padding: "3px",
                        }}
                      />
                    </label>
                    <Typography variant="caption">Add photo</Typography>
                  </div>
                  <IconButton onClick={() => removeInstruction(index)}>
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Button
              style={{
                marginLeft: "5px",
                marginBottom: "8px",
                color: "#2b2b2b",
                fontSize: "0.7em",
              }}
              onClick={addInstruction}
              color="primary"
              startIcon=<AddCircleOutlineIcon />
            >
              Add instruction
            </Button>
          </div>

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
            endIcon={<SaveIcon />}
            disabled={cuisineType === ""}
          >
            {recipe ? "Update Recipe" : "Save Recipe"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
