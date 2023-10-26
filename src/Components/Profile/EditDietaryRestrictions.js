import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { BACKEND_URL, DIETARYLIST } from "../../constants";

const EditDietaryRestrictions = (props) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    props.preloadDietaryRestrictions
      .split(",")
      .map((dietaryRestrictions, ind) => ({
        value: ind,
        label: dietaryRestrictions,
      }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add post request
    try {
      // console.log(cuisinePreferences.map((cuisine) => cuisine.label).join());
      // console.log(props.userId);

      await axios.put(`${BACKEND_URL}/users/profile/dietary-restrictions`, {
        userId: props.userId,
        dietaryRestrictions: dietaryRestrictions
          .map((diet) => diet.label)
          .join(), // wrangle array into string
      });

      props.setToggleProfileRefresh(!props.toggleProfileRefresh);
      props.setToggleShowEdit(true);
      props.setToggleShowSubmit(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const dietaryOptions = DIETARYLIST.map((diet, ind) => ({
    value: ind,
    label: diet,
  }));

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
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
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default EditDietaryRestrictions;
