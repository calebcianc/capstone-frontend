import { Typography } from "@mui/material";
import RecipeList from "../Recipe/RecipeList";
import "./CookbookList.css";

export default function CookbookList({
  cookbook,
  recipeList,
  userCookbookRecipes,
}) {
  const cookbookId = cookbook.id;
  const recipeIds = userCookbookRecipes[cookbookId];
  const filteredRecipes = recipeList.filter((recipe) =>
    recipeIds?.includes(recipe.id)
  );

  return (
    <div className="cookbook-card-container">
      <div className="cookbook-card-title">{cookbook.name}</div>
      <RecipeList recipeList={filteredRecipes} type="cookbook" />
    </div>
  );
}
