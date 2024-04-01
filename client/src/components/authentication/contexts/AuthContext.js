import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }; 
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// Provider component for AuthContext
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

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
