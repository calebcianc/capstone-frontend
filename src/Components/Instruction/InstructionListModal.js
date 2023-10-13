import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import InstructionCard from "./InstructionCard";
import IngredientList from "./IngredientList";
import SpeechToText from "../SpeechTextUtilities/SpeechToText";
import "../../App.css";

function InstructionListModal({ open, onClose, recipe }) {
  const [instructions, setInstructions] = useState(recipe?.instructions || []);
  const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [viewingInstructions, setViewingInstructions] = useState(false);
  const [listening, setListening] = useState(false);

  // console.log("instructions", instructions);
  // console.log("ingredients", ingredients);

  useEffect(() => {
    if (recipe?.instructions) {
      setInstructions(recipe.instructions);
    }
    if (recipe?.ingredients) {
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (instructions && currentCardIndex < instructions.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const handleStartCooking = () => {
    setViewingInstructions((prevState) => !prevState);

    // Start listening when switching to instruction view
    if (!viewingInstructions) {
      setListening(true);
    } else {
      setListening(false);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "100vh",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!viewingInstructions ? (
              <>
                <IngredientList
                  ingredients={ingredients}
                  handleStartCooking={handleStartCooking}
                />
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "60px",
                  }}
                >
                  <Button
                    onClick={handlePrevious}
                    disabled={currentCardIndex === 0}
                  >
                    <ArrowBackIosIcon />
                  </Button>
                  <p style={{ marginLeft: 10, fontSize: "24px" }}>
                    <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                      {currentCardIndex + 1}
                    </span>
                    /{instructions.length}
                  </p>
                  <Button
                    onClick={handleNext}
                    disabled={currentCardIndex === instructions.length - 1}
                    style={{ marginLeft: 10 }}
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                </div>

                <InstructionCard
                  instructions={instructions}
                  currentCardIndex={currentCardIndex}
                />
                <Button
                  style={{ marginBottom: 10 }}
                  onClick={handleStartCooking}
                >
                  Back to ingredient list
                </Button>
              </>
            )}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 30,
                right: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {!viewingInstructions ? (
                <p></p>
              ) : (
                <>
                  <p>Steps</p>{" "}
                  <SpeechToText
                    setCurrentCardIndex={setCurrentCardIndex}
                    totalSteps={recipe?.instructions.length || 0}
                    instructions={instructions}
                    listening={listening}
                    setListening={setListening}
                  />
                </>
              )}

              <Button onClick={onClose}>
                <CloseIcon />
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InstructionListModal;
