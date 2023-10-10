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

  const ingredients = recipe.ingredients?.map((ingredient, ind) => {
    return <li>{ingredient.name}</li>;
  });

  const instructions = recipe.instructions?.map((instruction, ind) => {
    return <li>{instruction.instruction} </li>;
  });

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      {/* {console.log(recipe)} */}
      <h1>{recipe.name}</h1>
      {/* <img src={recipe.photoUrl} alt={recipe.name} /> */}
      {/* ... display ingredients and instructions ... */}
      Ingredients:
      <ol>{ingredients}</ol>
      <br />
      Instructions:
      <ol>{instructions}</ol>
    </div>
  );
}
