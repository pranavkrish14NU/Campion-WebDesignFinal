
import { useEffect } from 'react';
import { logoutUser } from '../../api/logoutapi'; // Import the logout API function

const LogoutComponent = () => {
  useEffect(() => {
    const performLogout = async () => {
      const result = await logoutUser();

      if (result.success) {
        // You can redirect or perform any action after successful logout
        console.log('User successfully logged out');
      } else {
        console.error('Logout failed:', result.error);
      }
    };

    // Call the logout function when the component mounts
    performLogout();
  }, []);

  return null; // This component doesn't render anything
};

export default LogoutComponent;