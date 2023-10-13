import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function IngredientList({ ingredients, handleStartCooking }) {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setCheckedIngredients(ingredients.map((_, index) => index));
    } else {
      setCheckedIngredients([]);
    }
  }, [selectAll, ingredients]);

  const handleCheckboxChange = (index) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients((prev) =>
        prev.filter((checkedIndex) => checkedIndex !== index)
      );
    } else {
      setCheckedIngredients((prev) => [...prev, index]);
    }
  };

  const listItemStyle = {
    listStyleType: "none",
    paddingLeft: "20px",
  };

  return (
    <div
      style={{
        marginTop: 60,
        marginLeft: 40,
      }}
    >
      <h2>Ingredient List</h2>
      <hr />
      <p style={{ fontStyle: "italic" }}>
        Do you have all your ingredients? <br />
        Check your ingredients before you begin!
      </p>
      <br />
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={() => setSelectAll(!selectAll)}
        />
        Select All
      </label>
      <ul style={listItemStyle}>
        {ingredients.map((ingredient, index) => (
          <li key={index} style={listItemStyle}>
            <label>
              <input
                type="checkbox"
                checked={checkedIngredients.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
              <b>
                {ingredient.quantity} {ingredient.unitOfMeasurement}
              </b>{" "}
              {ingredient.name}
            </label>
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartCooking}
        disabled={checkedIngredients.length !== ingredients.length}
      >
        {" "}
        Let's start!
      </Button>
    </div>
  );
}

export default IngredientList;
