import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipePage() {
  const { recipeId } = useParams();

  // useEffect to fetch recipe from postgres db by recipeId
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const fetchedRecipe = await axios.get(
      `http://localhost:3001/recipes/${recipeId}`
    );
    setRecipe(fetchedRecipe.data[0]);
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div style={{ color: "#2b2b2b", backgroundColor: "#f7f4e8" }}>
      {/* Recipe Title & Photo */}
      <h3>{recipe.name}</h3>
      <img
        src={recipe.recipeImageUrl}
        alt={recipe.name}
        style={{ maxWidth: "50%", borderRadius: "16px" }}
      />

      {/* Ingredients */}
      <h4 style={{ marginTop: "16px", color: "#48789d" }}>Ingredients</h4>
      <ul style={{ listStyleType: "none", padding: 0, fontSize: "20px" }}>
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

      {/* Instructions */}
      <h4 style={{ marginTop: "16px", color: "#e7372d" }}>Instructions</h4>
      <ol>
        {recipe.instructions?.map((instruction) => (
          <li
            key={instruction.id}
            style={{ marginBottom: "12px", fontSize: "20px" }}
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
  );
}
