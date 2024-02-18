import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

// Custom hook to access AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext); // Access AuthContext

  // Throw error if AuthContext is not found
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context; // Return the context
};
