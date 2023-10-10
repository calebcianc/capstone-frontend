import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import StepCard from "./StepCard";
import "../../App.css";
import axios from "axios";
import BACKEND_URL from "../../Test/Constants.js";

function StepListModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [instructions, setInstructions] = useState({});
  const recipeId = 1;

  useEffect(() => {
    if (recipeId) {
      axios.get(`${BACKEND_URL}/recipes/${recipeId}`).then((response) => {
        setRecipe(response.data);
        setInstructions(response.data[0].instructions);
      });
    }
    console.log(instructions);
  }, [modalOpen]);

  const cardsData = [
    { content: "Step 1 Content", timer: "2min" },
    { content: "Step 2 Content" },
    { content: "Step 3 Content", timer: "10min" },
    // Add more cards as needed
  ];

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </Button>
      {/* <StepCard
        className="step-card-effect"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        instructions={instructions}
        cardsData={cardsData}
      /> */}
    </div>
  );
}

export default StepListModal;
