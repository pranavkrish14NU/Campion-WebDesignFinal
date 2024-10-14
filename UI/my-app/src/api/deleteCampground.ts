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

}

  export const deleteCampground = async (campgroundId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/campgrounds/${campgroundId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to the login page if the user is not authenticated
          window.location.href = '/login';
         console.log("login page")
        } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete campground. Server response: ${errorData.message}`);
        }
      }
      
  
      console.log('Campground deleted successfully');
    } catch (error) {
      console.error('Error deleting campground:', error);
      throw error;
    }
  };
  