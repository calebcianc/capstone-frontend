import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar style={{ backgroundColor: "var(--neutral-dark" }}>
        <Typography
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "Bitter, serif",
            fontSize: "2.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          ChefTalk
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
