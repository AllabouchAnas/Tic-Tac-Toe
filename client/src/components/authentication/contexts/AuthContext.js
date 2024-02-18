import { createContext, useReducer, useEffect } from 'react';

// Context for authentication
export const AuthContext = createContext();

// Reducer function for authentication state management
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }; // Set user upon login
    case 'LOGOUT':
      return { user: null }; // Clear user upon logout
    default:
      return state;
  }
};

// Provider component for AuthContext
export const AuthContextProvider = ({ children }) => {
  // Initialize state and dispatch function using authReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  // Check for user data in localStorage upon component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }); // Dispatch login action if user data found
    }
  }, []);

  // Log authentication state for debugging purposes
  console.log('AuthContext state:', state);

  // Provide authentication state and dispatch function to children components
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
