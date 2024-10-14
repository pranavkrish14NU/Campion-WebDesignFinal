const API_BASE_URL = 'http://localhost:3000';

interface Review {
  _id: string;
  body: string;
  rating: number;
}

export const deleteReview = async (campgroundId: string, reviewId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/campgrounds/${campgroundId}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log(`Review ${reviewId} deleted successfully.`);
      } else {
        const error = await response.json();
        console.error('Error deleting review:', error.message || 'Failed to delete review');
        throw new Error(error.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  };
  
