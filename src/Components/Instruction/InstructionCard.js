import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import CardContent from "@mui/material/CardContent";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import BACKEND_URL from "../../constants";
const STORAGE_PROFILE_FOLDER_NAME = "UserData";

function InstructionCard({
  instructions,
  currentCardIndex,
  userId,
  newImageUrl,
  setNewImageUrl,
  setInstructions,
}) {
  const currentInstruction = instructions.find(
    (instr) => instr.step === currentCardIndex
  );

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    // Store images in an images folder in Firebase Storage
    if (selectedFile) {
      const fileRef = storageRef(
        storage,
        `${STORAGE_PROFILE_FOLDER_NAME}/${userId}/recipe/${currentInstruction.recipeId}/instructionImage/${currentInstruction.step}/${selectedFile.name}`
      );
      try {
        const snapshot = await uploadBytes(fileRef, selectedFile);
        const instructionPhotoUrl = await getDownloadURL(snapshot.ref);
        console.log("retrieve instructionPhotoUrl", instructionPhotoUrl);
        setNewImageUrl(instructionPhotoUrl);
        // Update the current instruction's photo URL in the step modal
        const updatedInstructions = instructions.map((instr) => {
          if (instr.step === currentCardIndex) {
            return { ...instr, photoUrl: instructionPhotoUrl };
          }
          return instr;
        });
        setInstructions(updatedInstructions);
        // Call the saveImageUrlToPostgreSQL function
        await saveImageUrlToPostgreSQL(instructionPhotoUrl);
      } catch (error) {
        console.error("Error uploading file or getting download URL:", error);
      }
    }
  };

  async function saveImageUrlToPostgreSQL(imageUrl) {
    try {
      const response = await fetch(
        `${BACKEND_URL}/instructions/saveImageUrl/${currentInstruction.recipeId}/${currentInstruction.step}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photoUrl: imageUrl,
          }),
        }
      );
      if (response.ok) {
        console.log("Image URL saved in PostgreSQL.");
      } else {
        console.error("Failed to save image URL in PostgreSQL.");
      }
    } catch (error) {
      console.error("Error saving image URL in PostgreSQL:", error);
    }
  }

  return (
    <CardContent
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // marginTop: "50px",
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
          onChange={handleImageChange}
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
          <Timer duration={currentInstruction.timeInterval} />
        </div>
      )}
    </CardContent>
  );
}

export default InstructionCard;
