import BACKEND_URL from "../../constants";
import { useNavigate } from "react-router-dom";

export default async function makeOpenAiRequest(data, setIsLoading, event) {
  if (event) {
    event.preventDefault();
  }

  const accessToken = true;
  const userId = 1;
  data.userId = userId;

  if (accessToken) {
    console.log("generate for userid", userId);
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/recipes/new`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const newRecipeDetails = await response.json();
      if (newRecipeDetails && newRecipeDetails.error) {
        console.error("Error:", newRecipeDetails.error);
      } else {
        // useNavigate(`/recipe/${newRecipeDetails.id}`);
        console.log("newRecipeDetails", newRecipeDetails);
      }
      setIsLoading(false);
      return newRecipeDetails;
    } catch (error) {
      setIsLoading(false);

      console.error("Error while fetching:", error);
      throw error;
    }
  } else {
    alert("Login to create your preferred recipe!");
  }
}
