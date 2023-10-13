import React, { useState, useEffect } from "react";
import InstructionCard from "./InstructionCard";
import "../../App.css";

function InstructionListModal({ recipe }) {
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  console.log("recipe", recipe);
  console.log("recipe.instructions", recipe.instructions);
  console.log("ingredients", recipe.ingredients);

  return (
    <div>
      {/* <InstructionCard
        className="step-card-effect"
        instructions={instructions}
      /> */}
    </div>
  );
}

export default InstructionListModal;
