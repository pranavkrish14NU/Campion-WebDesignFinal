const API_BASE_URL = 'http://localhost:3000';
 
interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  review: string;
  reviews:string[];
  date: string;
  imageUrl: string;
  booking:string[];
}

 
export const fetchCampgrounds = async (): Promise<Campground[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/campgrounds`, {
      credentials: 'include', // Include credentials (cookies, HTTP authentication)
    });
    const campgroundsData: Campground[] = await response.json();
    return campgroundsData;
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    throw error;
  }
};
 
export default fetchCampgrounds;
