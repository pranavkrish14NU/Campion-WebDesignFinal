export const submitLogin = async (username: string, password: string) => {
    try {
        console.log(JSON.stringify({ username, password }))
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      console.dir(response,{depth:null});
  
      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to log in' };
      }
    } catch (error) {
      return { success: false, error: 'Error while logging in' };
    }
  };
  