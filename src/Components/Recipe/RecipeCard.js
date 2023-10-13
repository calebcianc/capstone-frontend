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
// import AglioOlioRecipe from "../../Test/AglioOlioRecipe";

const RecipeCard = (props) => {
  // const recipeId = 1;

  return (
    <Link to={`/recipe/${props.recipeData.id}`}>
      {console.log(props.recipeData)}
      <Card
        sx={{
          width: "500px",
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
          image={props.recipeData.recipeImageUrl}
          alt={props.recipeData.name}
        />
        <CardContent>
          <Typography variant="h6" color="var(--secondary-color)" gutterBottom>
            {props.recipeData.name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              color="var(--neutral-dark)"
              style={{ marginLeft: "8px" }}
            >
              {/* Sandra Schumann */}
              {props.recipeData.user.name}
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
              {`${props.recipeData.totalTime} min.`}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
