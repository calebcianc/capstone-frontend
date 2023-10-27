const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://cheftalk.fly.dev"
    : "http://localhost:3000";

const CUISINELIST = [
  "none",
  "chinese",
  "japanese",
  "mexican",
  "french",
  "indian",
  "thai",
  "spanish",
  "korean",
  "american",
];

const DIETARYLIST = [
  "none",
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "nut-free",
  "halal",
  "kosher",
  "paleo",
  "keto",
  "low-carb",
];

export { BACKEND_URL, CUISINELIST, DIETARYLIST };
