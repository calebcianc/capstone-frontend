import "./RecipePage.css";

export default function RecipeStep({ instruction }) {
  return (
    <div key={instruction.id} className="recipe-instructions-steps">
      {instruction.photoUrl && (
        <div className="step-label-container">
          <img
            src={instruction.photoUrl}
            alt={`Step ${instruction.step}`}
            className="step-photo"
            // style={{
            //   width: "50%",
            //   height: "100%",
            //   objectFit: "cover",
            //   objectPosition: "center",
            // }}
          />
          <span className="step-label">Step {instruction.step}</span>
        </div>
      )}

      {/* step */}
      <p>{instruction.instruction}</p>
    </div>
  );
}
