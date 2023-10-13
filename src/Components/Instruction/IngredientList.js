import React from "react";

function IngredientList({ ingredients }) {
  console.log("ingredients in ingredient list", ingredients);
  return (
    <div
      style={{
        marginTop: 60,
        marginLeft: 40,
      }}
    >
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <b>
              {ingredient.quantity} {ingredient.unitOfMeasurement}
            </b>{" "}
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientList;
