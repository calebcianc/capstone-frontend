// use ChatGPT API to generate recipe
import BACKEND_URL from "../../Test/Constants";
const accessToken = true;

export default async function recipeSurprise(event) {
  if (accessToken) {
    // console.log("generate for userid", userId);
    event.preventDefault();

    try {
      // setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/itinerary/new`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(itineraryInputs),
      });
      const newItineraryDetails = await response.json();
      if (newItineraryDetails && newItineraryDetails.error) {
      } else {
        setItineraryActivities(newItineraryDetails);
        const newItineraryId =
          newItineraryDetails[newItineraryDetails.length - 1].id;
        setSelectedItinerary(newItineraryId);
      }
      // navigate(`/upcoming`);
      // setIsLoading(false);
    } catch (error) {
      // setIsLoading(false);
    }
    handleClose();
  } else {
    alert("Login to use this feature!");
  }
}
