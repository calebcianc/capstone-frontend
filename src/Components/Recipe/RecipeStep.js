import { Card } from "@mui/material";
import "./RecipePage.css";

export default function RecipeStep({ instruction }) {
  return (
    <Card
      key={instruction.id}
      className="recipe-instructions-steps"
      style={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      {/* step photo */}
      {instruction.photoUrl && (
        <div className="step-label-container">
          <img
            src={instruction.photoUrl}
            alt={`Step ${instruction.step}`}
            style={{
              maxWidth: "100%",

              borderRadius: "16px",
            }}
          />
          <span className="step-label">Step {instruction.step}</span>
        </div>
      )}

      {/* step */}
      <p>{instruction.instruction}</p>
    </Card>
  );
}
