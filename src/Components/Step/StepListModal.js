import React, { useState } from "react";
import Button from "@mui/material/Button";
import StepCard from "./StepCard";
import "../../App.css";

function StepListModal() {
  const [modalOpen, setModalOpen] = useState(false);

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
      <StepCard
        className="step-card-effect"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cardsData={cardsData}
      />
    </div>
  );
}

export default StepListModal;
