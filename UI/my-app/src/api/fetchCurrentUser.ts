// authApi.js

const getCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/current-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        throw new Error('Failed to fetch current user');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  };
  
  export { getCurrentUser };
  