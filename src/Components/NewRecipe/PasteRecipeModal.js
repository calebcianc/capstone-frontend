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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import makeOpenAiRequest from "./OpenAiRequest";

function PasteRecipeModal({
  openUserInputRecipe,
  setOpenUserInputRecipe,
  setIsLoading,
}) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const data = { type: "paste", input: text };
    makeOpenAiRequest(data, setIsLoading);
    handleClose();
    console.log(text);
  };

  const handleClose = () => {
    setText("");
    setOpenUserInputRecipe(false);
  };

  return (
    <div>
      <Dialog
        open={openUserInputRecipe}
        onClose={handleClose}
        maxWidth="sm" // Set maximum width to medium (you can adjust this as needed)
        fullWidth // Make the dialog take up full width
      >
        <DialogTitle
          style={{
            backgroundColor: "#f7f4e8",
            color: "#2b2b2b",
            borderRadius: "16px 16px 0 0",
            fontWeight: "bold",
          }}
        >
          We'll try to keep it a secret!
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#f7f4e8", paddingBottom: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            placeholder="Paste your recipe here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ backgroundColor: "white" }}
          />
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: "#f7f4e8",
            borderRadius: "0 0 16px 16px",
            padding: "16px 24px",
          }}
        >
          <Button onClick={handleClose} style={{ color: "#e7372d" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2b2b2b",
              color: "#f7f4e8",
              borderRadius: "16px",
            }}
            color="primary"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            endIcon={<CloudUploadIcon />}
            disabled={text === ""}
          >
            Upload Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PasteRecipeModal;
