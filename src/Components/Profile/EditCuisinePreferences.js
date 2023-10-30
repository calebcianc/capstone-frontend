import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { BACKEND_URL, CUISINELIST } from "../../constants";

const EditCuisinePreferences = ({
  preloadCuisinePreferences = "",
  ...props
}) => {
  const cuisineArray = preloadCuisinePreferences
    ? preloadCuisinePreferences.split(",")
    : [];

  const [cuisinePreferences, setCuisinePreferences] = useState(
    cuisineArray.map((cuisinePreference, ind) => ({
      value: ind,
      label: cuisinePreference,
    }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${BACKEND_URL}/users/profile/cuisine-preferences`, {
        userId: props.userId,
        cuisinePreferences: cuisinePreferences
          .map((cuisine) => cuisine.label)
          .join(),
      });

      props.setToggleProfileRefresh(!props.toggleProfileRefresh);
      props.setToggleShowEdit(true);
      props.setToggleShowSubmit(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const cuisineOptions = CUISINELIST.map((cuisine, ind) => ({
    value: ind,
    label: cuisine,
  }));

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <Dialog open={props.openModal} onClose={props.handleCloseModal}>
      <DialogTitle>Edit Cuisine Preferences</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <CreatableSelect
            isMulti
            isClearable
            styles={selectFieldStyles}
            options={cuisineOptions}
            value={cuisinePreferences}
            onChange={(cuisine) => {
              setCuisinePreferences(cuisine);
            }}
          />
          <DialogActions>
            <Button
              onClick={props.handleCloseModal}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--neutral-dark)",
                border: "1px solid #2b2b2b",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={props.handleCloseModal}
              variant="contained"
              style={{ backgroundColor: "#2b2b2b", color: "white" }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCuisinePreferences;
