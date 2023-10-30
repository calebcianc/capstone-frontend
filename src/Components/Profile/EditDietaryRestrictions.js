import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { BACKEND_URL, DIETARYLIST } from "../../constants";

const EditDietaryRestrictions = (props) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const dietaryRestrictionsArray = props.preloadDietaryRestrictions
    ? props.preloadDietaryRestrictions.split(",")
    : [];

  useEffect(() => {
    const updatedDietaryRestrictions = props.preloadDietaryRestrictions
      ? props.preloadDietaryRestrictions.split(",").map((restriction, ind) => ({
          value: ind,
          label: restriction.trim(),
        }))
      : [];

    setDietaryRestrictions(updatedDietaryRestrictions);
  }, [props.preloadDietaryRestrictions]);

  console.log("dietaryRestrictions", dietaryRestrictions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${BACKEND_URL}/users/profile/dietary-restrictions`, {
        userId: props.userId,
        dietaryRestrictions: dietaryRestrictions
          .map((diet) => diet.label)
          .join(),
      });

      props.setToggleProfileRefresh(!props.toggleProfileRefresh);
      props.setToggleShowEdit(true);
      props.setToggleShowSubmit(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const dietaryOptions = DIETARYLIST.filter(
    (diet) => !dietaryRestrictionsArray.includes(diet.trim())
  ).map((diet, ind) => ({
    value: ind,
    label: diet,
  }));

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "130px",
      overflowY: "auto",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "120px",
      overflowY: "auto",
    }),
  };

  return (
    <Dialog open={props.openModal} onClose={props.handleCloseModal}>
      <DialogTitle>Edit Dietary Restrictions</DialogTitle>
      <DialogContent style={{ height: "150px", overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <CreatableSelect
            isMulti
            isClearable
            styles={selectFieldStyles}
            options={dietaryOptions}
            value={dietaryRestrictions}
            onChange={(diet) => {
              setDietaryRestrictions(diet);
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

export default EditDietaryRestrictions;
