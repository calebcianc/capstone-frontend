import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

export default function RecipePartialSurprise() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open Recipe Generator
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            backgroundColor: "#f7f4e8",
            color: "#2b2b2b",
            borderRadius: "16px 16px 0 0",
          }}
        >
          Recipe Parameters
        </DialogTitle>

        <DialogContent style={{ backgroundColor: "#f7f4e8" }}>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Meal Type"
            variant="outlined"
            style={{ backgroundColor: "#d5d4d0", borderRadius: "16px" }}
          >
            {/* Add options as necessary */}
            <MenuItem value="breakfast">Breakfast</MenuItem>
            <MenuItem value="lunch">Lunch</MenuItem>
            <MenuItem value="dinner">Dinner</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            margin="dense"
            label="Cuisine Type"
            variant="outlined"
            style={{ backgroundColor: "#d5d4d0", borderRadius: "16px" }}
          >
            {/* Add options as necessary */}
            <MenuItem value="italian">Italian</MenuItem>
            <MenuItem value="chinese">Chinese</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            margin="dense"
            label="Dietary Restrictions"
            variant="outlined"
            style={{ backgroundColor: "#d5d4d0", borderRadius: "16px" }}
          >
            {/* Add options as necessary */}
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Number of Servings"
            variant="outlined"
            style={{ backgroundColor: "#d5d4d0", borderRadius: "16px" }}
          />

          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Preparation Time (in minutes)"
            variant="outlined"
            style={{ backgroundColor: "#d5d4d0", borderRadius: "16px" }}
          />
        </DialogContent>

        <DialogActions
          style={{ backgroundColor: "#f7f4e8", borderRadius: "0 0 16px 16px" }}
        >
          <Button onClick={handleClose} style={{ color: "#e7372d" }}>
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              backgroundColor: "#81c545",
              color: "#f7f4e8",
              borderRadius: "16px",
            }}
          >
            Generate Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
