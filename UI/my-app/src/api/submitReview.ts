export const submitReview = async (campgroundId: string, reviewData: any) => {
    try {
      const response = await fetch(`http://localhost:3000/campgrounds/${campgroundId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
        credentials: 'include',
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to submit review' };
      }
    } catch (error) {
      return { success: false, error: 'Error while submitting review' };
    }
  };
  