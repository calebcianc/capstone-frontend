import React from "react";
import { Typography, Dialog, DialogContent, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const AuthDialog = ({ openDialog, setOpenDialog }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogContent>
        <Typography
          component="h2"
          id="modal-title"
          color="textPrimary"
          mb={2}
          variant="h6"
          fontWeight="bold"
        >
          Hey there!
        </Typography>
        <Typography>Sign up / Log in to use this feature!</Typography>
        <br />
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Sign Up / Log In
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
