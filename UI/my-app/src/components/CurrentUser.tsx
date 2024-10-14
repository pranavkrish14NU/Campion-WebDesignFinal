import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser } from '../api/fetchCurrentUser'; // Import the function from api fetch call

// Define the type for your user object
interface User {
  // Add properties of your user object
  _id: string;
  username: string;
  // ...
}

interface AuthContextProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const contextValue: AuthContextProps = {currentUser,setCurrentUser,};

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
