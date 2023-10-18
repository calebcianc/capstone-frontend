import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipeData }) => {
  return (
    <Link to={`/recipe/${recipeData.id}`} className="no-underline">
      {console.log(recipeData)}
      <Card className="recipe-card">
        <CardMedia
          component="img"
          height="140"
          image={recipeData.recipeImageUrl}
          alt={recipeData.name}
        />
        <CardContent>
          <Typography variant="h6" className="recipe-card-name" gutterBottom>
            {recipeData.name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              color="var(--neutral-dark)"
              style={{ marginLeft: "8px" }}
            >
              {recipeData.user.name} (
              {recipeData.isPublic ? "Public" : "Private"})
            </Typography>
            <IconButton
              style={{ marginLeft: "auto", color: "var(--accent-color-1)" }}
              aria-label="like"
            >
              <HourglassTopIcon />
            </IconButton>
            <Typography
              variant="body2"
              color="var(--neutral-dark)"
              component="p"
            >
              {`${recipeData.totalTime} min.`}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
