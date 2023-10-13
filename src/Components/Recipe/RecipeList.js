import RecipeCard from "./RecipeCard";

const RecipeList = (props) => {
  const recipeList = props.recipeList?.map((recipe, ind) => {
    return <RecipeCard recipeData={recipe} />;
  });

  return (
    <div>
      {/* {console.log(props.recipeList)} */}
      {recipeList}
    </div>
  );
};

export default RecipeList;
