import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const RecipeCard = () => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: "16px",
        background: "white",
        // "var(--neutral-light)",
        // "var(--primary-color)",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://th.bing.com/th/id/OIG.uK2TpbWL9ciGi1qUPLUD?pid=ImgGn" // Replace with the image URL you have
        alt="Juicy Pear Recipe"
      />

      <CardContent>
        <Typography variant="h6" color="var(--secondary-color)" gutterBottom>
          Caramelized pear, radicchio, and blue cheese salad
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            color="var(--neutral-dark)"
            style={{ marginLeft: "8px" }}
          >
            Sandra Schumann
          </Typography>

          <IconButton
            style={{ marginLeft: "auto", color: "var(--accent-color-1)" }}
            aria-label="like"
          >
            <HourglassTopIcon />
          </IconButton>

          <Typography variant="body2" color="var(--neutral-dark)" component="p">
            20 min.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
