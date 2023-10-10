import StepListModal from "../Step/StepListModal";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const recipe = "test";

  return (
    <div>
      <RecipeCard recipe={recipe} />
      <StepListModal />
    </div>
  );
};

export default RecipeList;
