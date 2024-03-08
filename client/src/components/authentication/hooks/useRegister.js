import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Custom hook for user registration
export const useRegister = () => {
    // State variables for error handling and loading state
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    // Access authentication context and dispatch function
    const { dispatch } = useAuthContext();

    // Function to handle user registration
    const register = async (username, password) => {
        setIsLoading(true); // Set loading state
        setError(null); // Clear previous error

        // Attempt to register via API
        const response = await fetch('/api/user/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const json = await response.json(); // Extract JSON response

        // Handle errors
        if (!response.ok) {
            setIsLoading(false); // Set loading state to false
            setError(json.error); // Set error message
        } else {
            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update authentication context with user data
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false); // Set loading state to false
        }
    };

    // Return register function, loading state, and error message
    return { register, isLoading, error };
};
