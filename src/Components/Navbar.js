import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: "var(--neutral-dark" }}>
        <Typography
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "Bitter, serif",
            fontSize: "2.5rem",
            // fontWeight: "bold",
          }}
        >
          ChefTalk
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
