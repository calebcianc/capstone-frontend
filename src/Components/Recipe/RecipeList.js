import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

const RecipeList = (props) => {
  const recipeList = props.recipeList?.map((recipe, ind) => {
    return (
      <div key={ind}>
        <RecipeCard recipeData={recipe} />
      </div>
    );
  });

  return <div className="recipe-list-container">{recipeList}</div>;
};

export default RecipeList;
