// external imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Box, Fab, Typography, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
// internal imports
import RecipeStep from "./RecipeStep";
import InstructionListModal from "../Instruction/InstructionListModal";
import { BACKEND_URL } from "../../constants";
// css imports
import "./RecipePage.css";
import "../NewRecipe/FabIcon.css";
import "../NewRecipe/LoadingGif.css";
import TypeRecipeModal from "../NewRecipe/TypeRecipeModal";

export default function RecipePage() {
  const [instructionModalopen, setInstructionModalOpen] = useState(false);
  const { recipeId } = useParams();
  const [userId, setUserId] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(""); //for instruction photo
  const [viewingInstructions, setViewingInstructions] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [servings, setServings] = useState(recipe.servingSize || 1);
  const [adjustedIngredients, setAdjustedIngredients] = useState([]);
  const [openTypeRecipeModal, setOpenTypeRecipeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [newImageUrl, recipeId, counter]);

  const fetchRecipe = async () => {
    const fetchedRecipe = await axios.get(`${BACKEND_URL}/recipes/${recipeId}`);
    setRecipe(fetchedRecipe.data[0]);
    setUserId(fetchedRecipe.data[0].userId);
    setIsDataFetched(true);
  };

  useEffect(() => {
    if (isDataFetched) {
      const adjustedIngredients = recipe.ingredients?.map((ingredient) => {
        const adjustedQuantity =
          ingredient.quantity === null
            ? null
            : (ingredient.quantity / recipe.servingSize) * servings;
        return {
          ...ingredient,
          quantity: adjustedQuantity,
        };
      });
      setAdjustedIngredients(adjustedIngredients);
    }
  }, [servings, isDataFetched]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <TypeRecipeModal
        openTypeRecipeModal={openTypeRecipeModal}
        setOpenTypeRecipeModal={setOpenTypeRecipeModal}
        recipe={recipe}
        setIsLoading={setIsLoading}
        setCounter={setCounter}
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

      <div className="recipe-container">
        {/* Recipe Title & Photo */}
        <div className="recipe-title-photo">
          <div className="recipe-title">{recipe.name}</div>
          <img
            src={recipe.recipeImageUrl}
            alt={recipe.name}
            className="recipe-photo"
          />
        </div>

        {/* Ingredients */}
        <div className="recipe-ingredients ">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
              height: "11%",
            }}
          >
            <Button
              onClick={() => setOpenTypeRecipeModal(true, recipe)}
              style={{
                backgroundColor: "var(--primary-color",
                color: "var(--neutral-dark)",
              }}
              // variant="contained"
              startIcon={<EditIcon />}
            >
              Update Recipe
            </Button>
          </div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
              backgroundColor: "white",
              margin: "2px 10px 8px 10px",
              padding: "10px",
              borderRadius: "16px",
              border: "1px solid var(--neutral-light)",
              height: "15%",
            }}
          >
            {/* Preparation Time Group */}
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
                variant="h5"
                fontFamily={"Bitter, serif"}
                fontWeight={"bold"}
                // style={{
                //   // color: "#2b2b2b",
                //   marginBottom: "4px", // Adjusts spacing between label and controls
                // }}
              >
                Total Time
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography>{recipe.totalTime} mins</Typography>
              </Box>
            </Box>
            {/* Serving Size Group */}
            <Box
              flex="1"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              padding={"0 8px"}
            >
              <Typography
                variant="h5"
                fontFamily={"Bitter, serif"}
                fontWeight={"bold"}
                style={{
                  // color: "#2b2b2b",
                  height: "32px",
                  marginBottom: "4px", // Adjusts spacing between label and controls
                }}
              >
                Serving Size
              </Typography>
              <Box display="flex" alignItems="center" sx={{ height: "24px" }}>
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
          </Box>
          <div className="recipe-ingredients-header-box">
            <Typography
              variant="h5"
              fontFamily={"Bitter, serif"}
              fontWeight={"bold"}
              height={"40px"}
            >
              Ingredients
            </Typography>
          </div>
          <div className="ingredients-list">
            {adjustedIngredients
              ? adjustedIngredients?.map((ingredient) => (
                  <li key={ingredient.id} className="ingredient-row">
                    <div className="ingredient-quantity">
                      <span>{ingredient.quantity}</span>
                      {ingredient.unitOfMeasurement && (
                        <span> {ingredient.unitOfMeasurement}</span>
                      )}
                    </div>
                    <div className="ingredient-name">
                      <span>{ingredient.name}</span>
                    </div>
                  </li>
                ))
              : recipe.ingredients?.map((ingredient) => (
                  <li key={ingredient.id} className="ingredient-row">
                    <div className="ingredient-quantity">
                      <span>{ingredient.quantity}</span>
                      {ingredient.unitOfMeasurement && (
                        <span> {ingredient.unitOfMeasurement}</span>
                      )}
                    </div>
                    <div className="ingredient-name">
                      <span>{ingredient.name}</span>
                    </div>
                  </li>
                ))}
          </div>
        </div>
        {/* Instructions */}
        <div className="recipe-instructions">
          <div className="recipe-instructions-header-box">
            <Typography
              variant="h5"
              fontFamily={"Bitter, serif"}
              fontWeight={"bold"}
              height={"40px"}
            >
              Instructions
            </Typography>
          </div>
          <div className="recipe-instructions-steps-box">
            {recipe.instructions
              ?.sort((a, b) => a.step - b.step)
              .map((instruction) => (
                <RecipeStep
                  key={instruction.id}
                  instruction={instruction}
                  recipe={recipe}
                  userId={userId}
                  newImageUrl={newImageUrl}
                  setNewImageUrl={setNewImageUrl}
                  setViewingInstructions={setViewingInstructions}
                  viewingInstructions={viewingInstructions}
                />
              ))}
          </div>
        </div>

        {/* start cooking button */}
        <div className="fab-container">
          <Fab color="primary" onClick={() => setInstructionModalOpen(true)}>
            <img src="/logo512.png" alt="Start Cooking" className="fab-icon" />
          </Fab>
          <Typography
            variant="caption"
            display="block"
            mt={1}
            style={{ backgroundColor: "#f7f4e8" }}
          >
            <b>START COOKING!</b>
          </Typography>
        </div>
      </div>

      {/* Instruction List Modal */}
      <InstructionListModal
        recipe={recipe}
        adjustedIngredients={adjustedIngredients}
        open={instructionModalopen}
        onClose={() => {
          setInstructionModalOpen(false);
          setViewingInstructions(false);
        }}
        userId={userId}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
        setViewingInstructions={setViewingInstructions}
        viewingInstructions={viewingInstructions}
      />
    </>
  );
}
