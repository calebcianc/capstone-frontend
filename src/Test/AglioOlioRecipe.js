// assign JSON data to a variable called 'AglioOlioRecipe'
const AglioOlioRecipe = {
  id: 1,
  name: "Spaghetti Aglio e Olio",
  userId: 1,
  creatorId: 1,
  // servings: 4,
  totalTime: 15,
  photoUrl:
    "https://th.bing.com/th/id/OIG.FWwYWWy71up9PSm0_nfn?pid=ImgGn&w=1024&h=1024&rs=1",
  ingredients: [
    {
      id: 1,
      name: "Spaghetti",
      quantity: 400,
      unitOfMeasurement: "grams",
    },
    {
      id: 2,
      name: "Extra virgin olive oil",
      quantity: 0.25,
      unitOfMeasurement: "cup",
    },
    {
      id: 3,
      name: "Thinly sliced garlic",
      quantity: 6,
      unitOfMeasurement: "cloves",
    },
    {
      id: 4,
      name: "Red pepper flakes",
      quantity: 0.5,
      unitOfMeasurement: "teaspoon",
    },
    {
      id: 5,
      name: "Chopped fresh parsley",
      quantity: 0.25,
      unitOfMeasurement: "cup",
    },
    {
      id: 6,
      name: "Salt",
      quantity: "to taste",
      unitOfMeasurement: "",
    },
    {
      id: 7,
      name: "Black pepper",
      quantity: "to taste",
      unitOfMeasurement: "",
    },
  ],
  instructions: [
    {
      id: 1,
      step: 1,
      timeInterval: 3,
      instruction:
        "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente, about 8-10 minutes.",
      photoUrl:
        "https://images.services.kitchenstories.io/ulsjibr7QK9Ceud44woUc657cCs=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg",
    },
    {
      id: 2,
      step: 2,
      timeInterval: 13,
      instruction:
        "Meanwhile, in a large skillet, heat the olive oil over medium heat. Add the garlic and red pepper flakes, and sauté for about 1-2 minutes, until the garlic is golden but not browned.",
      photoUrl:
        "https://images.services.kitchenstories.io/ulsjibr7QK9Ceud44woUc657cCs=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg",
    },
    {
      id: 3,
      step: 3,
      timeInterval: 15,
      instruction:
        "Reserve about 1 cup of the pasta cooking water, then drain the spaghetti.",
      photoUrl:
        "https://images.services.kitchenstories.io/ulsjibr7QK9Ceud44woUc657cCs=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg",
    },
    {
      id: 4,
      step: 4,
      timeInterval: 16,
      instruction:
        "Add the spaghetti to the skillet with the garlic oil, and toss well to coat, adding a bit of the reserved pasta water if needed to loosen things up.",
      photoUrl:
        "https://images.services.kitchenstories.io/ulsjibr7QK9Ceud44woUc657cCs=/1080x0/filters:quality(80)/images.kitchenstories.io/recipeStepImages/08_09_TraditionalGarlicAndOliveOilPasta_step01.jpg",
    },
  ],
};

export default AglioOlioRecipe;
