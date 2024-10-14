export  const submitRegister = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include', // Use the correct variables here
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to submit registration' };
      }
    } catch (error) {
      return { success: false, error: 'Error while submitting registration' };
    }
  };