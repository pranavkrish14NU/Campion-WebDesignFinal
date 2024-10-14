
const API_BASE_URL = "http://localhost:3000";

interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const updateCampground = async (
  campground: Campground
): Promise<void> => {
  console.log(`outside if handle idididididi ${JSON.stringify(campground)}`);

  try {
    // Assuming your API supports updating a campground
    const c = await fetch(
      
      `${API_BASE_URL}/campgrounds/${campground._id}/edit`,
      {
        method: "PUT", // or 'PATCH' depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campground),
        credentials: 'include',
      }
    );
    console.log(`outside if handle new test ${c.json}`);
  } catch (error) {
    console.error("Error updating campground:", error);
    throw error;
  }
};
