import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { BACKEND_URL, CUISINELIST } from "../../constants";

const EditCuisinePreferences = (props) => {
  const [cuisinePreferences, setCuisinePreferences] = useState(
    props.preloadCuisinePreferences
      .split(",")
      .map((cuisinePreferences, ind) => ({
        value: ind,
        label: cuisinePreferences,
      }))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add post request
    try {
      // console.log(cuisinePreferences.map((cuisine) => cuisine.label).join());
      // console.log(props.userId);

      await axios.put(`${BACKEND_URL}/users/profile/cuisine-preferences`, {
        userId: props.userId,
        cuisinePreferences: cuisinePreferences
          .map((cuisine) => cuisine.label)
          .join(), // wrangle array into string
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
        options={cuisineOptions}
        value={cuisinePreferences}
        onChange={(cuisine) => {
          setCuisinePreferences(cuisine);
        }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default EditCuisinePreferences;
