import { BACKEND_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

export default async function makeOpenAiRequest(
  data,
  setIsLoading,
  event,
  setRecipeId
) {
  // if (event) {
  //   event.preventDefault();
  // }

  const accessToken = true;
  const userId = 1;
  data.userId = userId;
  console.log("Sending data: ", data);
  setRecipeId(14);
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
        console.log("newRecipeDetails", JSON.stringify(newRecipeDetails));
        console.log("newRecipeDetails.id", newRecipeDetails.id);
        setRecipeId(newRecipeDetails.id);
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
