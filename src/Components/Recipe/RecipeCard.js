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
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import NoMealsIcon from "@mui/icons-material/NoMeals";
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
        <div className="recipe-card-top">
          <Typography
            variant="h6"
            className="recipe-card-name"
            style={{ marginBottom: "16px", fontFamily: "Bitter" }}
          >
            {recipeData.name}
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            color="var(--neutral-dark)"
            style={{ marginLeft: "0px", display: "flex", alignItems: "center" }}
          >
            <AccountCircleIcon style={{ marginRight: "5px" }} />{" "}
            {recipeData.user.name}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            width: "100%",
          }}
          aria-label="like"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <LocalDiningIcon />
            <Typography
              variant="body2"
              color="var(--neutral-dark)"
              component="p"
            >
              {recipeData.cuisine}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <NoMealsIcon />

            <Typography
              variant="body2"
              color="var(--neutral-dark)"
              component="p"
            >
              {recipeData.dietaryRestrictions}
            </Typography>
          </div>

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
              {`${recipeData.totalTime} min`}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
