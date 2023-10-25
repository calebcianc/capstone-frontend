import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, Typography, Box, TextField } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { BACKEND_URL } from "../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "75%",
  width: "50%",
  bgcolor: "background.paper",
  padding: "20px",
  borderRadius: "8px", // Optional for rounded corners
  boxShadow: 24,
  p: 4,
};

export default function FirstLoginModal({ setCounter }) {
  const [name, setName] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] =
    useState([]);
  const { user } = useAuth0();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add post request
    try {
      await axios.post(`${BACKEND_URL}/users`, {
        name,
        email: user?.email,
        cuisinePreferences: selectedCuisine
          .map((cuisine) => cuisine.label)
          .join(), // wrangle array into string
        dietaryRestrictions: selectedDietaryRestrictions
          .map((diet) => diet.label)
          .join(),
      });

      setName("");
      setSelectedCuisine([]);
      setSelectedDietaryRestrictions([]);
      setCounter((prev) => prev + 1);
      handleClose();
    } catch (e) {
      console.log(e.message);
    }
  };

  const cuisineList = [
    "None",
    "Chinese",
    "Japanese",
    "Mexican",
    "French",
    "Indian",
    "Thai",
    "Spanish",
    "Korean",
    "American",
  ];

  const cuisineOptions = cuisineList.map((cuisine, ind) => ({
    value: ind, // value is what we store
    label: cuisine, // label is what we display
  }));

  const dietaryList = [
    "None",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Halal",
    "Kosher",
    "Paleo",
    "Keto",
    "Low-Carb",
  ];
  const dietaryOptions = dietaryList.map((diet, ind) => ({
    value: ind, // value is what we store
    label: diet, // label is what we display
  }));

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f7f4e8",
            borderRadius: "16px",
            padding: "24px",
            width: "500px", // Adjust width or use maxWidth
            outline: "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                color: "#2b2b2b",
                fontWeight: "bold",
                fontSize: "1.75em",
                marginBottom: "16px",
              }}
            >
              First Things First
            </Typography>{" "}
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#2b2b2b",
                color: "#f7f4e8",
                borderRadius: "16px",
                minWidth: "36px",
                height: "36px",
              }}
            >
              X
            </Button>
          </div>

          <Typography
            id="modal-modal-description"
            style={{
              display: "block",
              color: "#2b2b2b",
              // marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            How do we address you?
          </Typography>
          <div style={{ marginBottom: "12px" }}>
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: "white" }}
              InputProps={{
                style: { height: 40, padding: "10px 14px" }, // Adjust these values as per your requirement
              }}
              InputLabelProps={{
                style: { top: "-6px" },
              }}
            />
          </div>

          <div className="form-field" style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "#2b2b2b",
                marginBottom: "8px",
              }}
            >
              What are your favourite cuisines?
            </label>
            <CreatableSelect
              isMulti
              isClearable
              styles={selectFieldStyles} // Adjust styles to match your theme
              options={cuisineOptions}
              value={selectedCuisine}
              onChange={(cuisine) => {
                if (cuisine && cuisine.some((item) => item.value === "None")) {
                  setSelectedCuisine([{ value: "None", label: "None" }]);
                } else {
                  setSelectedCuisine(cuisine);
                }
              }}
            />
          </div>
          <div className="form-field" style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                color: "#2b2b2b",
                marginBottom: "8px",
              }}
            >
              Do you have any dietary restrictions?
            </label>
            <CreatableSelect
              isMulti
              isClearable
              styles={selectFieldStyles} // Adjust styles to match your theme
              options={dietaryOptions}
              value={selectedDietaryRestrictions}
              onChange={(diet) => {
                if (diet && diet.some((item) => item.value === "None")) {
                  setSelectedDietaryRestrictions([
                    { value: "None", label: "None" },
                  ]);
                } else {
                  setSelectedDietaryRestrictions(diet);
                }
              }}
            />
          </div>
          <div
            className="form-field"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "0",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#2b2b2b",
                color: "#f7f4e8",
                borderRadius: "16px",
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
