import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

// Component for user registration
const Register = () => {
    // State variables for email, password, loading state, and error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, isLoading, error } = useRegister(); // Use the useRegister hook for registration functionality

    // Handle form submission for registration
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        await register(email, password); // Call the register function from the useRegister hook
    }

    // Render the registration form
    return (
        <form className="register" onSubmit={ handleSubmit }>
            <h3>Register</h3>

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
            <button disabled={ isLoading }>Register</button>

            {/* Display error message if there is an error */}
            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default Register;