import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipeCard = () => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: "16px",
        background: "var(--primary-color)",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="URL_OF_THE_IMAGE" // Replace with the image URL you have
        alt="Juicy Pear Recipe"
      />

      <CardContent>
        <Typography variant="h6" color="var(--neutral-dark)" gutterBottom>
          Juicy Pear Recipes To Try This Season
        </Typography>

        <Typography variant="body2" color="var(--neutral-dark)" component="p">
          20 min.
        </Typography>

        <Typography variant="h5" color="var(--secondary-color)" gutterBottom>
          Caramelized pear, radicchio, and blue cheese salad
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="URL_OF_THE_PROFILE_PICTURE" // Replace with the profile picture URL you have
            alt="Sandra Schumann"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
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
            <FavoriteIcon />
          </IconButton>

          <Typography variant="body1" color="var(--neutral-dark)">
            4.21K
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
