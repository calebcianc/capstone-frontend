import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AddToCookbookModal from "./AddToCookbookModal";

export default function AddToCookbookButton({ recipeId }) {
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // TODO: replace with actual logic
  const handleOpen = (e) => {
    e.preventDefault();

    setOpen(true);
  };
  return (
    <>
      <div
        onClick={handleOpen}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
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
              Add to Cookbook
            </Typography>
          </>
        )}{" "}
      </div>
      <AddToCookbookModal
        open={open}
        setOpen={setOpen}
        setIsAdded={setIsAdded}
        recipeId={recipeId}
      />
    </>
  );
}
