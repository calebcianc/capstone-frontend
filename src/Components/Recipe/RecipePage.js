import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  // useEffect to fetch recipe from postgres db by recipeId
  useEffect(() => {
    const fetchedRecipe = "test";
    // fetchRecipe(recipeId);
    setRecipe(fetchedRecipe);
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.photoUrl} alt={recipe.title} />
      {/* ... display ingredients and instructions ... */}
      "test"
    </div>
  );
}
