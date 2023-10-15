import RecipeCard from "./RecipeCard";

const RecipeList = (props) => {
  const recipeList = props.recipeList?.map((recipe, ind) => {
    return (
      <div key={ind}>
        <RecipeCard recipeData={recipe} />
      </div>
    );
  });

  return (
    <div>
      {/* {console.log(props.recipeList)} */}
      {recipeList}
    </div>
  );
};

export default RecipeList;
