import React, { useEffect, useContext } from "react";
import Timer from "./Timer";
import CardContent from "@mui/material/CardContent";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { BACKEND_URL } from "../../constants";
import { GlobalUseContext } from "../../GlobalUseContext";
const STORAGE_PROFILE_FOLDER_NAME = "UserData";

function InstructionCard({
  instructions,
  currentCardIndex,
  userId,
  newImageUrl,
  setNewImageUrl,
  setInstructions,
  setCounter,
  recipe,
}) {
  const currentInstruction = instructions.find(
    (instr) => instr.step === currentCardIndex
  );

  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);

  useEffect(() => {
    if (
      isAuthenticated &&
      userProfile.id === recipe.userId &&
      currentCardIndex === instructions.length
    ) {
      // Update lastCookDate in the database
      updateLastCookDate();
    }
  }, [currentCardIndex, instructions.length]);

  async function updateLastCookDate() {
    const currentDate = new Date().toISOString();
    try {
      const response = await fetch(
        `${BACKEND_URL}/recipes/updateLastCookDate/${currentInstruction.recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lastCookedDate: currentDate,
          }),
        }
      );
      setCounter((prev) => prev + 1);
      if (response.ok) {
        console.log("Last cook date updated successfully.");
      } else {
        console.error("Failed to update last cook date.");
      }
    } catch (error) {
      console.error("Error updating last cook date:", error);
    }
  }

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
        padding: "16px 16px 0px 16px",
        // marginTop: "50px",
      }}
    >
      {/* Image upload area */}
      <label
        style={{
          cursor: "pointer",
          display: "block",
          width: "60vh",
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
              borderRadius: "16px",
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
          width: "60vh", // This will ensure the text div has the same width as the image div
          marginTop: 20, // This adds some space above the text
          marginBottom: 20, // This adds some space below the text
          textAlign: "justify",
          padding: "0 10px", // Optional: This adds some padding on the sides of the text if desired
        }}
      >
        {currentInstruction.instruction}
      </div>

      {/* Timer */}
      {currentInstruction.timeInterval && (
        <div style={{ textAlign: "center" }}>
          <Timer
            duration={currentInstruction.timeInterval}
            currentInstruction={currentInstruction}
          />
        </div>
      )}
    </CardContent>
  );
}

export default InstructionCard;
