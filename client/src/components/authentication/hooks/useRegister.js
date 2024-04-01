import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { dispatch } = useAuthContext();

    const register = async (username, password) => {
        setIsLoading(true); 
        setError(null); 

        const response = await fetch('/api/user/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const json = await response.json(); 

        if (!response.ok) {
            setIsLoading(false); 
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
            setRedirect(true); 
        }
    };

    return { register, isLoading, error, redirect };
};
