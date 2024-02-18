import { useAuthContext } from "./useAuthContext";

// Custom hook for handling user logout
export const useLogout = () => {
    // Access authentication context and dispatch function
    const { dispatch } = useAuthContext();

    // Function to handle user logout
    const logout = () => {
        // Remove user data from local storage
        localStorage.removeItem('user');

        // Dispatch logout action to update authentication context
        dispatch({ type: 'LOGOUT' });
    };

    // Return logout function
    return { logout };
};
