import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextToSpeech from "../SpeechTextUtilities/TextToSpeech";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function InstructionCard({ instructions, currentCardIndex }) {
  const currentInstruction = instructions.find(
    (instr) => instr.id === currentCardIndex + 1
  );
  console.log("currentCardIndex", currentCardIndex + 1);
  console.log("instruction card", instructions);
  console.log("currentInstruction", currentInstruction);

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

  return (
    // <Card
    // style={{
    //   width: 300,
    //   height: 400,
    //   overflow: "hidden",
    //   display: "flex",
    //   justifyContent: "center",
    // }}
    // >
    <CardContent
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "60px",
      }}
    >
      {/* Image upload area */}
      <label
        style={{
          cursor: "pointer",
          display: "block",
          width: "50vh",
          height: "50vh",
          border: currentInstruction.photoUrl ? "none" : "2px dashed gray",
          position: "relative",
        }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          // onChange={handleImageChange}
        />
        {currentInstruction.photoUrl ? (
          <img
            src={currentInstruction.photoUrl}
            alt="current_step_picture"
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
      <div
        style={{
          marginTop: 10,
          textAlign: "justify",
        }}
      >
        {currentInstruction.instruction}
      </div>

      {/* Timer (if provided) */}
      {currentInstruction.timeInterval && (
        <div style={{ marginTop: 10, textAlign: "center" }}>
          Duration:{currentInstruction.timeInterval} min
        </div>
      )}
    </CardContent>
    // </Card>
  );
}

export default InstructionCard;
