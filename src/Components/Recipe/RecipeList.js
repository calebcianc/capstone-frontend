import InstructionListModal from "../Instruction/InstructionListModal";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const recipe = "test";

  return (
    <div>
      <RecipeCard recipe={recipe} />
      <InstructionListModal />
    </div>
  );
};

export default RecipeList;
