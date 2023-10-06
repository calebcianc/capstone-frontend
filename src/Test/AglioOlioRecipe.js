// assign JSON data to a variable called 'AglioOlioRecipe'
const AglioOlioRecipe = {
  title: "Spaghetti Aglio e Olio",
  servings: 4,
  ingredients: [
    {
      item: "Spaghetti",
      quantity: 400,
      unit: "grams",
    },
    {
      item: "Extra virgin olive oil",
      quantity: 0.25,
      unit: "cup",
    },
    {
      item: "Garlic",
      quantity: 6,
      unit: "cloves",
      preparation: "thinly sliced",
    },
    {
      item: "Red pepper flakes",
      quantity: 0.5,
      unit: "teaspoon",
    },
    {
      item: "Fresh parsley",
      quantity: 0.25,
      unit: "cup",
      preparation: "chopped",
    },
    {
      item: "Salt",
      quantity: "to taste",
      unit: "",
    },
    {
      item: "Black pepper",
      quantity: "to taste",
      unit: "",
    },
  ],
  instructions: {
    "Step 1":
      "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente, about 8-10 minutes.",
    "Step 2":
      "Meanwhile, in a large skillet, heat the olive oil over medium heat. Add the garlic and red pepper flakes, and sauté for about 1-2 minutes, until the garlic is golden but not browned.",
    "Step 3":
      "Reserve about 1 cup of the pasta cooking water, then drain the spaghetti.",
    "Step 4":
      "Add the spaghetti to the skillet with the garlic oil, and toss well to coat, adding a bit of the reserved pasta water if needed to loosen things up.",
    "Step 5":
      "Season with salt and black pepper to taste, and toss with fresh parsley.",
    "Step 6":
      "Serve immediately, garnished with additional parsley if desired.",
  },
};

export default AglioOlioRecipe;
