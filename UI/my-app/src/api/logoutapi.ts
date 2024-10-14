// logout.js

export const logoutUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        window.location.href = '/login';
        return { success: true };
        
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to logout' };
      }
    } catch (error) {
      return { success: false, error: 'Error while logging out' };
    }
  };
  