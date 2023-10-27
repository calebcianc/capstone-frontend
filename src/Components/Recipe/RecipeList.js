import RecipeCard from "./RecipeCard";
import "./RecipeList.css";
import "../Cookbook/CookbookList.css";

const RecipeList = ({ recipeList, type }) => {
  const mappedRecipeList = recipeList?.map((recipe, ind) => {
    return (
      <div key={recipe.id}>
        <RecipeCard recipeData={recipe} type={type} />
      </div>
    );
  });

  return (
    <div
      className={
        type === "cookbook"
          ? "cookbook-recipe-list-container"
          : "recipe-list-container"
      }
    >
      {mappedRecipeList}

      {mappedRecipeList.length === 0
        ? "Oops! Looks like there's no recipes here."
        : null}
    </div>
  );
};

export default RecipeList;
