import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

function PasteRecipeModal({ openUserInputRecipe, setOpenUserInputRecipe }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // Process the text here, e.g., send it to your server or do some processing on the client side
    console.log(text);
  };

  const handleClose = () => {
    setOpenUserInputRecipe(false);
  };

  return (
    <div>
      <Dialog open={openUserInputRecipe} onClose={handleClose}>
        <DialogTitle>Paste Your Recipe</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            Submit Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PasteRecipeModal;
