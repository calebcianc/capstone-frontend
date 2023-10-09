import StepListModal from "../Step/StepListModal";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  return (
    <div>
      <RecipeCard />
      <RecipeCard />
      <StepListModal />
      <RecipeCard />
    </div>
  );
};

export default RecipeList;
