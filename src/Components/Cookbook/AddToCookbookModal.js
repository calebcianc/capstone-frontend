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
  Snackbar,
  Alert,
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
  cookbooksByRecipe,
}) {
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const [cookbooks, setCookbooks] = useState([]);
  const [newCookbookName, setNewCookbookName] = useState("");

  // console.log to check what's inside cookbooks
  useEffect(() => {
    console.log("cookbooks", JSON.stringify(cookbooks));
    console.log("cookbooksByRecipe", cookbooksByRecipe);
  }, [cookbooks]);

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
        if (!cookbooksByRecipe || cookbooksByRecipe?.length === 0) {
          const cookbooksData = data
            .filter((cookbook) => cookbook.name !== "Personally created")
            .map((cookbook) => ({
              name: cookbook.name,
              checked: cookbook.name === "Added from Explore" ? true : false,
              id: cookbook.id,
            }));
          setCookbooks(cookbooksData);
        } else {
          const cookbooksData = data.map((cookbook) => ({
            name: cookbook.name,
            checked: cookbooksByRecipe.includes(cookbook.id),
            id: cookbook.id,
          }));
          setCookbooks(cookbooksData);
        }
      } catch (error) {
        console.error("Error fetching user cookbooks:", error);
      }
    };
    isAuthenticated && fetchUserCookbooks();
  }, [cookbooksByRecipe]);

  // set isAdded to true if recipe is already in a cookbook
  useEffect(() => {
    if (cookbooksByRecipe && cookbooksByRecipe.length > 0) {
      setIsAdded(true);
    }
    console.log("cookbooks", cookbooks);
    console.log("cookbooksByRecipe", cookbooksByRecipe);
  }, [cookbooksByRecipe]);

  // code to send requests to the backend to update the recipe_cookbooks table
  const handleSubmit = async () => {
    // code to change the icon to bookmark added
    if (cookbooks.some((cookbook) => cookbook.checked)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }

    const checkedCookbooks =
      !cookbooksByRecipe || cookbooksByRecipe.length === 0
        ? cookbooks.filter((cookbook) => cookbook.checked)
        : cookbooks;
    // cookbooks.map((cookbook) => ({
    //     id: cookbook.id,
    //     checked:
    //       cookbook.checked || cookbooksByRecipe.includes(cookbook.id),
    //   }));

    const requestBody = {
      checkedCookbooks,
    };
    let url = `${BACKEND_URL}/cookbooks/${userProfile.id}/${recipeId}`;
    let method = "PUT";

    if (cookbooksByRecipe && cookbooksByRecipe.length > 0) {
      url = `${BACKEND_URL}/cookbooks/updateRecipeCookbooks/${recipeId}`;
      method = "POST";
    }

    // Perform the POST/PUT request to your server with the selected cookbooks
    if (isAuthenticated) {
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();
        console.log(responseData);

        if (!cookbooksByRecipe) {
          const duplicateRecipeId = responseData.duplicateRecipeId;
          navigate(`/recipe/${duplicateRecipeId}`);
        }
        setSnackbarMessage(responseData.message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating cookbooks:", error);

        setSnackbarMessage("Error updating cookbooks");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }

    setNewCookbookName(""); // Reset the new cookbook name field
    setOpen(false);
  };

  // code to handle checkbox toggle
  const handleCheckboxToggle = (index) => {
    const newCookbooks = [...cookbooks];
    newCookbooks[index].checked = !newCookbooks[index].checked;
    setCookbooks(newCookbooks);
  };

  // code to handle adding a new cookbook to the list
  const handleAddNewCookbook = () => {
    const cookbookNameExists = cookbooks.some(
      (cookbook) =>
        cookbook.name.toLowerCase() === newCookbookName.toLowerCase()
    );

    if (!cookbookNameExists) {
      setCookbooks([
        ...cookbooks,
        { name: newCookbookName, checked: true, id: null },
      ]);
      console.log("cookbooks", cookbooks);
      setNewCookbookName(""); // Reset the new cookbook name field
    } else {
      setSnackbarMessage("Cookbook name already exists");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
    }
  };

  // code to handle closing the modal
  const onClose = (e) => {
    e.preventDefault();
    setNewCookbookName(""); // Reset the new cookbook name field
    setOpen(false);
  };

  // code to handle closing the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
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
                      disabled={
                        cookbook.name === "Personally created" ||
                        cookbook.name === "Added from Explore"
                      }
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
                    <IconButton
                      onClick={handleAddNewCookbook}
                      disabled={newCookbookName.trim() === ""}
                    >
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
            {!cookbooksByRecipe ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
