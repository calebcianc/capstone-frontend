import { useContext } from "react";
import BACKEND_URL from "../../constants";
import { GlobalUseContext } from "../../GlobalUseContext";

export default async function makeOpenAiRequest(
  data,
  setIsLoading,
  event,
  setRecipeId
) {
  const { userProfile, isAuthenticated } = useContext(GlobalUseContext);
  data.userId = userProfile.id;
  console.log("Sending data: ", data);
  setRecipeId(14);
  if (isAuthenticated) {
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
