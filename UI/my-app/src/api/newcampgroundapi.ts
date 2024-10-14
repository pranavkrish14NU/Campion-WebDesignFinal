// api/campgroundApi.ts
const API_BASE_URL = 'http://localhost:3000';

interface CampgroundDataPost {
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const postCampground = async (campground: CampgroundDataPost): Promise<number> => {
  try {
    console.log('Request URL:', `${API_BASE_URL}/campgrounds/new`);
    console.log('Request Headers:', {
      'Content-Type': 'application/json',
    });
    console.log('Request Body:', JSON.stringify(campground));

    const response = await fetch(`${API_BASE_URL}/campgrounds/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campground),
      credentials: 'include',
    });

    // console.log(response);
    if (!response.ok) {
      if (response.status === 401) {
        // Redirect to the login page if the user is not authenticated
        window.location.href = '/login';
       console.log("login page")
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.status;
  } catch (error) {
    console.error('Error posting campground:', error);
    return Promise.reject(error);
  }
};
