import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

const RecipeList = (props) => {
  const recipeList = props.recipeList?.map((recipe, ind) => {
    return <RecipeCard recipeData={recipe} />;
  });

  return (
    <div className="recipe-list-container">
      {/* {console.log(props.recipeList)} */}
      {recipeList}
    </div>
  );
};

export default RecipeList;
