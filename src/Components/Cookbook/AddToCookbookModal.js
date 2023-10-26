import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  Grid,
  InputAdornment,
  List,
  ListItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { BACKEND_URL } from "../../constants";
import "../NewRecipe/SuggestRecipeModal.css";
import { GlobalUseContext } from "../../GlobalUseContext";

export default function AddToCookbookModal({
  open,
  setOpen,
  setIsAdded,
  recipeId,
}) {
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);

  const [cookbooks, setCookbooks] = useState([
    { name: "Cookbook 1", checked: false },
    { name: "Cookbook 2", checked: false },
    // ... other cookbooks
  ]);
  const [newCookbookName, setNewCookbookName] = useState("");

  const handleCheckboxToggle = (index) => {
    const newCookbooks = [...cookbooks];
    newCookbooks[index].checked = !newCookbooks[index].checked;
    setCookbooks(newCookbooks);
  };

  const handleAddNewCookbook = () => {
    setCookbooks([...cookbooks, { name: newCookbookName, checked: true }]);
    setNewCookbookName(""); // Reset the new cookbook name field
  };

  const handleSubmit = async () => {
    if (cookbooks.some((cookbook) => cookbook.checked)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
    const checkedCookbooks = cookbooks.filter((cookbook) => cookbook.checked);
    const newCookbook = { name: newCookbookName };
    const requestBody = {
      checkedCookbooks,
      newCookbook,
    };
    // Perform the POST/PUT request to your server with the selected cookbooks
    try {
      const response = await fetch(
        `${BACKEND_URL}/cookbooks/${userProfile.id}/${recipeId}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      const responseData = await response.json();
      // render toast if successful
      // generate code for toast here

      console.log(responseData);
    } catch (error) {
      console.error("Error updating cookbooks:", error);
    }

    setOpen(false);
  };

  const onClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  // on render, fetch user's cookbooks from server
  useEffect(() => {
    console.log(`userProfile id: ${userProfile.id}`);
    console.log(`url: ${BACKEND_URL}/cookbooks/${userProfile.id}`);
    const fetchUserCookbooks = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/cookbooks/${userProfile.id}`
        );
        const data = await response.json();
        const cookbooksData = data
          .filter((cookbook) => cookbook.name !== "Personally created")
          .map((cookbook) => ({
            name: cookbook.name,
            checked: cookbook.name === "Added from Explore" ? true : false,
          }));
        setCookbooks(cookbooksData);
      } catch (error) {
        console.error("Error fetching user cookbooks:", error);
      }
    };
    fetchUserCookbooks();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{
          backgroundColor: "#f7f4e8",
          color: "#2b2b2b",
          borderRadius: "16px",
          fontWeight: "bold",
        }}
      >
        Add to cookbook
      </DialogTitle>

      <DialogContent style={{ backgroundColor: "#f7f4e8", paddingBottom: 0 }}>
        <List>
          {cookbooks.map((cookbook, index) => (
            <ListItem
              key={index}
              style={{ backgroundColor: "white", margin: "2px 0" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cookbook.checked}
                    onChange={() => handleCheckboxToggle(index)}
                    name={cookbook.name}
                    color="default"
                  />
                }
                label={cookbook.name}
              />
            </ListItem>
          ))}
          <ListItem style={{ backgroundColor: "white", margin: "2px 0" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="New Cookbook"
              value={newCookbookName}
              onChange={(e) => setNewCookbookName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleAddNewCookbook}>
                    <AddCircleOutlineIcon color="action" />
                  </IconButton>
                ),
              }}
            />
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions
        style={{
          backgroundColor: "#f7f4e8",
          borderRadius: "0 0 16px 16px",
          padding: "16px 24px 24px 24px",
        }}
      >
        <Button onClick={onClose} style={{ color: "#e7372d" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{
            backgroundColor: "#2b2b2b",
            color: "#f7f4e8",
            borderRadius: "16px",
          }}
          endIcon={<BookmarkAddIcon />}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
