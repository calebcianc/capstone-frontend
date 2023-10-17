import "./RecipePage.css";
import React, { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import BACKEND_URL from "../../constants";
const STORAGE_PROFILE_FOLDER_NAME = "UserData";

export default function RecipeStep({
  instruction,
  recipe,
  userId,
  newImageUrl,
  setNewImageUrl,
}) {
  const [instructions, setInstructions] = useState(recipe?.instructions || []);
  const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
  const [currentCardIndex, setCurrentCardIndex] = useState(1);

  useEffect(() => {
    if (recipe?.instructions) {
      setInstructions(recipe.instructions);
    }
    if (recipe?.ingredients) {
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

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
    <div key={instruction.id} className="recipe-instructions-steps">
      {instruction.photoUrl ? (
        <div className="step-label-container">
          <img
            src={instruction.photoUrl}
            alt={`Step ${instruction.step}`}
            className="step-photo"
          />
          <span className="step-label">Step {instruction.step}</span>
        </div>
      ) : (
        <div className="placeholder-container">
          <label for={`file-input-${instruction.id}`}>
            <div className="placeholder">
              <input
                id={`file-input-${instruction.id}`}
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <AddPhotoAlternateIcon
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 50,
                }}
              />
            </div>
          </label>
          <span className="step-label">Step {instruction.step}</span>
        </div>
      )}

      {/* step */}
      <br />
      <p>{instruction.instruction}</p>
    </div>
  );
}
