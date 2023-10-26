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
import "./InstructionListModal.css";

function InstructionListModal({
  open,
  onClose,
  recipe,
  userId,
  newImageUrl,
  setNewImageUrl,
  viewingInstructions,
  setViewingInstructions,
  adjustedIngredients,
  setCounter,
}) {
  const [instructions, setInstructions] = useState(recipe?.instructions || []);
  const [ingredients, setIngredients] = useState(adjustedIngredients || []);
  const [currentCardIndex, setCurrentCardIndex] = useState(1);

  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (recipe?.instructions) {
      setInstructions(recipe.instructions);
    }
    if (recipe?.ingredients) {
      setIngredients(adjustedIngredients);
    }
  }, [recipe, adjustedIngredients]);

  const handlePrevious = () => {
    if (currentCardIndex > 1) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (instructions && currentCardIndex < instructions.length) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const handleStartCooking = () => {
    setViewingInstructions((prevState) => !prevState);

    // Start listening when switching to instruction view
    if (!viewingInstructions) {
      setListening(true);
      setCurrentCardIndex(1);
    } else {
      setListening(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        // styling for modal
        style={{
          maxWidth: "1025px",
          minWidth: "500px",
          backgroundColor: "rgba(255, 255, 255)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "16px",
        }}
        className="instruction-list-modal"
      >
        {!viewingInstructions ? (
          <IngredientList
            ingredients={ingredients}
            handleStartCooking={handleStartCooking}
          />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "35px",
              }}
            >
              <Button
                onClick={handlePrevious}
                disabled={currentCardIndex === 1}
              >
                <ArrowBackIosIcon />
              </Button>
              <p style={{ marginLeft: 10, fontSize: "24px" }}>
                <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                  {currentCardIndex}
                </span>
                /{instructions.length}
              </p>
              <Button
                onClick={handleNext}
                disabled={currentCardIndex === instructions.length}
                style={{ marginLeft: 10 }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </div>

            <InstructionCard
              instructions={instructions}
              currentCardIndex={currentCardIndex}
              userId={userId}
              newImageUrl={newImageUrl}
              setNewImageUrl={setNewImageUrl}
              setInstructions={setInstructions}
              setCounter={setCounter}
              recipe={recipe}
            />

            <Button style={{ marginBottom: 10 }} onClick={handleStartCooking}>
              Back to ingredient list
            </Button>
          </>
        )}

        {/* speech to text feature + close button */}
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
              <p>Steps</p> {/* for commands during cooking */}
              <SpeechToText
                setCurrentCardIndex={setCurrentCardIndex}
                currentCardIndex={currentCardIndex}
                totalSteps={recipe?.instructions.length || 0}
                instructions={instructions}
                listening={listening}
                setListening={setListening}
                onClose={onClose}
              />
            </>
          )}

          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default InstructionListModal;
