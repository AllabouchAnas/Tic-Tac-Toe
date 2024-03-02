import { useState } from "react";
import { useLogin } from "../hooks/useLogin"; 
import './Auth.css'

// Component for user login
const Login = () => {
    // State variables for username, password, and login status
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin(); // Use the useLogin hook for login functionality

    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        await login(username, password); // Call the login function from the useLogin hook
    }

    // Render the login form
    return (
        <form className="login" onSubmit={ handleSubmit }>
            <h1>Login:</h1>

            {/* Input field for username */}
            <input 
                type="text"  
                onChange={(e) => setUsername(e.target.value)} // Update username state on change
                placeholder="Username"
                value={username} // Set username value from state
            />

            <br/>

            {/* Input field for password */}
            <input 
                type="password"  
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                placeholder="Password"
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
