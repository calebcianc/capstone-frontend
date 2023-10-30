import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./IngredientList.css";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

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
    <div className="ingredient-list">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginRight: "8px" }}>Ingredient List</h2>
        <Tooltip
          title={
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Command</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Next Step</td>
                    <td>To go to the next step</td>
                  </tr>
                  <tr>
                    <td>Previous Step</td>
                    <td>To go to the previous step</td>
                  </tr>
                  <tr>
                    <td>Repeat</td>
                    <td>To repeat current step</td>
                  </tr>
                  <tr>
                    <td>Start Timer</td>
                    <td>To start timer</td>
                  </tr>
                  <tr>
                    <td>Pause Timer</td>
                    <td>To pause timer</td>
                  </tr>
                  <tr>
                    <td>Reset Timer</td>
                    <td>To reset timer</td>
                  </tr>
                  <tr>
                    <td>Stop</td>
                    <td>To stop the reading of instructions</td>
                  </tr>
                  <tr>
                    <td>Close</td>
                    <td>To close the pop up</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        >
          <Button size="small" startIcon={<InfoIcon fontSize="small" />}>
            Voice Commands
          </Button>
        </Tooltip>
      </div>

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
      <br />
      <div className="start-button-container">
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
    </div>
  );
}

export default IngredientList;
