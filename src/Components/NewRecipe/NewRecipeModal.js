import React, { useState } from "react";
import { Fab, Modal, ButtonGroup, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RecipePartialSurprise from "./RecipePartialSurprise";

function NewRecipeModal() {
  const [open, setOpen] = useState(false);
  const [openRecipePartialSurprise, setOpenRecipePartialSurprise] =
    useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>

      {/* option selector */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            width: 400,
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <ButtonGroup
            variant="text"
            color="primary"
            fullWidth
            aria-label="text primary button group"
          >
            <Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "40px" }}>📋</div>{" "}
                {/* Replace with your Paste Text icon */}
                <Typography>Paste Recipe</Typography>
              </div>
            </Button>
            <Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "40px" }}>🌐</div>{" "}
                {/* Replace with your Web Browsing icon */}
                <Typography>Some Help</Typography>
              </div>
            </Button>
            <Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenRecipePartialSurprise(true);
                }}
              >
                <div style={{ fontSize: "40px" }}>🎁</div>{" "}
                {/* Replace with your Mystery Box icon */}
                <Typography>Surprise me!</Typography>
              </div>
            </Button>
          </ButtonGroup>
        </div>
      </Modal>

      <RecipePartialSurprise
        openRecipePartialSurprise={openRecipePartialSurprise}
        setOpenRecipePartialSurprise={setOpenRecipePartialSurprise}
      />
    </div>
  );
}

export default NewRecipeModal;
