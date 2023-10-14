import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import InstructionListModal from "../Instruction/InstructionListModal";
import BACKEND_URL from "../../constants";
import "./RecipePage.css";
import { Typography } from "@mui/material";

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
    <div className="recipe-container">
      {/* Recipe Title & Photo */}
      <div className="recipe-title-photo">
        <h3>{recipe.name}</h3>
        <img
          src={recipe.recipeImageUrl}
          alt={recipe.name}
          style={{ borderRadius: "16px", width: "430px" }}
        />

        <Typography style={{ margin: "10px 0px" }}>
          Total time: {recipe.totalTime} mins
        </Typography>
      </div>

      <div className="recipe-ingredients-instructions">
        {/* Ingredients */}
        <div className="recipe-ingredients">
          <h4 style={{ marginTop: "16px", color: "#48789d" }}>Ingredients</h4>
          <ul
            className="ingredients-instructions"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {recipe.ingredients?.map((ingredient) => (
              <li key={ingredient.id} style={{ marginBottom: "8px" }}>
                <span>{ingredient.name}: </span>
                <span>{ingredient.quantity}</span>
                {ingredient.unitOfMeasurement && (
                  <span> {ingredient.unitOfMeasurement}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Instructions */}
        <div className="recipe-instructions">
          <h4 style={{ marginTop: "16px", color: "#e7372d" }}>Instructions</h4>
          <ol>
            {recipe.instructions?.map((instruction) => (
              <li
                key={instruction.id}
                className="ingredients-instructions"
                style={{ marginBottom: "12px" }}
              >
                <div>{instruction.instruction}</div>
                {instruction.photoUrl && (
                  <img
                    src={instruction.photoUrl}
                    alt={`Step ${instruction.step}`}
                    style={{
                      maxWidth: "50%",
                      borderRadius: "16px",
                      marginTop: "8px",
                    }}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Button
        style={{
          position: "fixed",
          bottom: 70,
          left: "50%",
          width: 450,
          transform: "translateX(-50%)",
        }}
        variant="contained"
        color="primary"
        onClick={() => setInstructionModalOpen(true)}
      >
        Start Cooking
      </Button>
      <InstructionListModal
        recipe={recipe}
        open={instructionModalopen}
        onClose={() => setInstructionModalOpen(false)}
      />
    </div>
  );
}
