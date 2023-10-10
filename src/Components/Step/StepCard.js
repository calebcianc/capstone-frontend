import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function StepCard({ open, onClose, instructions, cardsData }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUploadedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < instructions.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  return (
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
            width: 500,
            height: 500,
            backgroundColor: "rgba(255, 255, 255)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ArrowBackIosIcon />
          </Button>

          <Card
            style={{
              width: 300,
              height: 400,
              overflow: "hidden",
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              {/* Image upload area */}
              <label
                style={{
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  height: "30%",
                  border: "2px dashed gray",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  // onChange={handleImageChange}
                />
                {instructions[currentCardIndex].photoUrl ? (
                  <img
                    src={instructions[currentCardIndex].photoUrl}
                    alt="Uploaded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <AddPhotoAlternateIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: 50,
                    }}
                  />
                )}
              </label>

              {/* Description */}
              <div style={{ marginTop: 10, textAlign: "center" }}>
                {instructions[currentCardIndex].instruction}
              </div>

              {/* Timer (if provided) */}
              {instructions[currentCardIndex].timeInterval && (
                <div style={{ marginTop: 10, textAlign: "center" }}>
                  {instructions[currentCardIndex].timeInterval} min
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={handleNext}
            disabled={currentCardIndex === instructions.length - 1}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ArrowForwardIosIcon />
          </Button>

          <Button
            onClick={onClose}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default StepCard;
