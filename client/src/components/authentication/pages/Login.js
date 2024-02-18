import { useState } from "react";
import { useLogin } from "../hooks/useLogin"; 

// Component for user login
const Login = () => {
    // State variables for email, password, and login status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin(); // Use the useLogin hook for login functionality

    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        await login(email, password); // Call the login function from the useLogin hook
    }

    // Render the login form
    return (
        <form className="register" onSubmit={ handleSubmit }>
            <h3>Login:</h3>

            {/* Input field for email */}
            <label>Email:</label>
            <input 
                type="text"  
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                value={email} // Set email value from state
            />

            <br/>

            {/* Input field for password */}
            <label>Password:</label>
            <input 
                type="password"  
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                value={password} // Set password value from state
            />

            <br/>   

            {/* Button for form submission */}
            <button disabled={ isLoading }>Login</button>

            {/* Display error message if there is an error */}
            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default Login;
