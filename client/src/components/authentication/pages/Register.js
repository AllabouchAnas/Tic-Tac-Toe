import { useState, useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from 'react-router-dom';

// Component for user registration
const Register = () => {
    // State variables for username, password, loading state, and error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { register, isLoading, error, redirect } = useRegister(); // Use the useRegister hook for registration functionality

    // Handle form submission for registration
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const success = await register(username, password); // Call the register function from the useRegister hook
    }

    useEffect(() => {
        if (redirect) {
            navigate('/'); // Redirect to home page
        }
    }, [redirect, navigate]);

    // Render the registration form
    return (
        <form className="login" onSubmit={ handleSubmit }>
            <h1>Register:</h1>

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
            <label>Upload your profile photo:</label>
            <input
                type="file"
                name="fileUpload"
                id="fileUpload"
            />

            <br/>

            {/* Button for form submission */}
            <button disabled={ isLoading }>Register</button>

            {/* Display error message if there is an error */}
            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default Register;
