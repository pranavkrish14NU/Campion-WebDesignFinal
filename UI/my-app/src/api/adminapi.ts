const API_BASE_URL = 'http://localhost:3000';
 
interface Admin {
  _id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  review: [];
  date: string;
  booking: [];
 
  // Add other properties as needed based on your data structure
}
 
export const fetchDetails = async (): Promise<Admin[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin`);
    const adminData: Admin[] = await response.json();
    return adminData;
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    throw error;
  }
};
 
export default fetchDetails;
