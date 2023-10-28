import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddToCookbookButton from "../Cookbook/AddToCookbookButton";
import "./RecipeCard.css";
import "../Cookbook/CookbookList.css";

const RecipeCard = ({ recipeData, type }) => {
  const location = useLocation();

  return (
    <Card
      className={type === "cookbook" ? "cookbook-recipe-card" : "recipe-card"}
    >
      <Link to={`/recipe/${recipeData.id}`} className="no-underline">
        <CardMedia
          component="img"
          height="140"
          image={recipeData.recipeImageUrl}
          alt={recipeData.name}
        />
      </Link>

      <CardContent style={{ padding: "16px" }}>
        <Typography
          variant="h6"
          className="recipe-card-name"
          style={{ marginBottom: "16px" }}
        >
          {recipeData.name}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            color="var(--neutral-dark)"
            style={{ marginLeft: "8px", display: "flex", alignItems: "center" }}
          >
            <AccountCircleIcon style={{ marginRight: "5px" }} />{" "}
            {recipeData.user.name}
            {/* ({recipeData.isPublic ? "Public" : "Private"}) */}
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: "auto",
              minWidth: "35%",
              maxWidth: "50%",
            }}
            aria-label="like"
          >
            {location.pathname === "/explore" ? (
              <AddToCookbookButton recipeId={recipeData.id} />
            ) : null}
            <div style={{ display: "flex", alignItems: "center" }}>
              <HourglassTopIcon />
              <Typography
                variant="body2"
                color="var(--neutral-dark)"
                component="p"
              >
                {`${recipeData.totalTime} min.`}
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
