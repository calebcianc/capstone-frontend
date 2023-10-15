import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, Typography, Box } from "@mui/material";
import CreatableSelect from "react-select/creatable";

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

export default function FirstLoginModal() {
  const [name, setName] = useState("");
  const [selectedCuisine, setselectedCuisine] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] =
    useState([]);
  const {
    // loginWithRedirect,
    // isAuthenticated,
    user,
    // isLoading,
    // getAccessTokenSilently,
    // logout,
  } = useAuth0();

  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add post request
    try {
      await axios.post(`http://localhost:3001/users`, {
        name,
        email: user?.email,
        cusinePreferences: selectedCuisine
          .map((cuisine) => cuisine.label)
          .join(), // wrangle array into string
        dietaryRestrictions: selectedDietaryRestrictions
          .map((diet) => diet.label)
          .join(),
      });

      setName("");
      setselectedCuisine([]);
      setSelectedDietaryRestrictions([]);
      handleClose();
    } catch (e) {
      console.log(e.message);
    }
  };

  const cuisineList = [
    "none",
    "chinese",
    "japanese",
    "mexican",
    "french",
    "indian",
    "thai",
    "spanish",
    "korean",
    "american",
  ];

  const cuisineOptions = cuisineList.map((cuisine, ind) => ({
    value: ind, // value is what we store
    label: cuisine, // label is what we display
  }));

  const dietaryList = [
    "none",
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "nut-free",
    "halal",
    "kosher",
    "paleo",
    "keto",
    "low-carb",
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
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          Placeholder close modal button (testing)->{" "}
          <Button onClick={handleClose} variant="contained">
            X
          </Button>
          <br />
          <br />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            First Things First
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>How do we address you?</strong>
          </Typography>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                {/* <label>Name:</label> */}
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Preferences
              </Typography>
              <br />
              <div className="form-field">
                <label>Cuisine Preferences</label>
                <CreatableSelect
                  isMulti
                  isClearable
                  styles={selectFieldStyles}
                  options={cuisineOptions}
                  value={selectedCuisine}
                  onChange={(cuisine) => {
                    setselectedCuisine(cuisine);
                    // console.log(cuisine.map((cuisine) => cuisine.label).join());
                  }}
                />
              </div>
              <div className="form-field">
                <label>Dietary Restrictions</label>
                <CreatableSelect
                  isMulti
                  isClearable
                  styles={selectFieldStyles}
                  options={dietaryOptions}
                  value={selectedDietaryRestrictions}
                  onChange={(diet) => {
                    setSelectedDietaryRestrictions(diet);
                    // console.log(diet.map((diet) => diet.label).join());
                  }}
                />
              </div>
              <br />
              <br />
              <div className="form-field">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
