import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InstructionListModal from "../Instruction/InstructionListModal";
import { Fab, Typography } from "@mui/material";
import BACKEND_URL from "../../constants";
import "./RecipePage.css";
import "../NewRecipe/FabIcon.css";
import RecipeStep from "./RecipeStep";

export default function RecipePage() {
  const [instructionModalopen, setInstructionModalOpen] = useState(false);
  const { recipeId } = useParams();

  // useEffect to fetch recipe from postgres db by recipeId
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const fetchedRecipe = await axios.get(`${BACKEND_URL}/recipes/${recipeId}`);
    setRecipe(fetchedRecipe.data[0]);
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <div className="recipe-container">
        {/* Recipe Title & Photo */}
        <div className="recipe-title-photo">
          <Typography
            variant="h4"
            fontFamily={"Bitter, serif"}
            fontWeight={"bold"}
            marginTop={"20px"}
            marginBottom={"20px"}
            paddingLeft={"10px"}
            height={"40px"}
            gutterBottom
          >
            {recipe.name}
          </Typography>
          <img
            src={recipe.recipeImageUrl}
            alt={recipe.name}
            className="recipe-photo"
          />
          {/* <Typography variant="caption" style={{ margin: "10px 0px" }}>
            Total time: {recipe.totalTime} mins
          </Typography> */}
        </div>

        {/* Ingredients */}
        <div className="recipe-ingredients">
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
          <ul className="ingredients-instructions">
            {recipe.ingredients?.map((ingredient) => (
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
          </ul>
        </div>

        {/* Instructions */}
        <div className="recipe-instructions">
          <div className="recipe-instructions-header-box">
            <Typography
              variant="h5"
              fontFamily={"Bitter, serif"}
              fontWeight={"bold"}
              marginTop={"10px"}
              height={"40px"}
            >
              Instructions
            </Typography>
          </div>
          <div className="recipe-instructions-steps-box">
            {recipe.instructions?.map((instruction) => (
              <RecipeStep instruction={instruction} />
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
        open={instructionModalopen}
        onClose={() => setInstructionModalOpen(false)}
      />
    </>
  );
}
