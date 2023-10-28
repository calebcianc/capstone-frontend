import React, { useState, useContext } from "react";
import { Button, Typography } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AddToCookbookModal from "./AddToCookbookModal";
import AuthDialog from "../Auth/AuthDialog";
import { GlobalUseContext } from "../../GlobalUseContext";

export default function AddToCookbookButton({ recipeId, cookbooksByRecipe }) {
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // TODO: replace with actual logic
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOpenDialog(true);
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginRight: "15px",
        }}
      >
        {isAdded ? (
          <>
            <BookmarkAddedIcon />
            <Typography
              variant="body2"
              color="var(--neutral-dark)"
              component="p"
            >
              Added
            </Typography>
          </>
        ) : (
          <>
            <BookmarkAddIcon />
            <Typography
              variant="body2"
              color="var(--neutral-dark)"
              component="p"
            >
              Add
            </Typography>
          </>
        )}{" "}
      </div>
      <AddToCookbookModal
        open={open}
        setOpen={setOpen}
        setIsAdded={setIsAdded}
        recipeId={recipeId}
        cookbooksByRecipe={cookbooksByRecipe}
      />
      <AuthDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}
