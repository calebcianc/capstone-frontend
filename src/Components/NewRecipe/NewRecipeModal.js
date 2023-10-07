import React, { useState } from "react";
import { Fab, Modal, ButtonGroup, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function NewRecipeModal() {
  const [open, setOpen] = useState(false);

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
                <Typography>Input manual</Typography>
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
                <Typography>From website</Typography>
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
                <div style={{ fontSize: "40px" }}>🎁</div>{" "}
                {/* Replace with your Mystery Box icon */}
                <Typography>Surprise me!</Typography>
              </div>
            </Button>
          </ButtonGroup>
        </div>
      </Modal>
    </div>
  );
}

export default NewRecipeModal;
