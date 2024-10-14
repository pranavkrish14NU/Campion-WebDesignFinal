export const Booking = async (campgroundId: string,bookingData: any) => {
  try {

    const response = await fetch(`http://localhost:3000/campgrounds/${campgroundId}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
      credentials: 'include',
    });

    if (response.ok) {

      return { success: true };
    } else {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to book campsite' };
    }
  } catch (error) {
    return { success: false, error: 'Error while booking campsite' };
  }
};
