const API_BASE_URL = 'http://localhost:3000';

interface CampgroundDetailed {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  review: string;
  date: string;
  imageUrl: string;
  reviews:[];
  booking:[]
  author: {
    _id: string;
    username: String;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  

  
  // Add more properties as needed
}

export const fetchCampgroundDetailed = async (campgroundId: string): Promise<CampgroundDetailed> => {
  try {
    const response = await fetch(`${API_BASE_URL}/campgrounds/${campgroundId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const campgroundData: CampgroundDetailed = await response.json();
    console.log(campgroundData);
    return campgroundData;
  } catch (error) {
    console.error('Error fetching campground:', error);
    throw error;
  }
};
