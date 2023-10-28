const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://cheftalk.fly.dev"
    : "http://localhost:3000";

const CUISINELIST = [
  "None",
  "Chinese",
  "Japanese",
  "Mexican",
  "French",
  "Indian",
  "Thai",
  "Spanish",
  "Korean",
  "American",
];

const DIETARYLIST = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Halal",
  "Kosher",
  "Paleo",
  "Keto",
  "Low-Carb",
];

export { BACKEND_URL, CUISINELIST, DIETARYLIST };
