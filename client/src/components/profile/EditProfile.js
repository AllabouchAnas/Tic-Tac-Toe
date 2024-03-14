import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../authentication/pages/Auth.css';

// Component for editing user profile
const EditProfile = () => {
    // State variables for new username, new password, and old username
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate to redirect upon successful update.
    const user = JSON.parse(localStorage.getItem('user'));

    // Handle form submission for editing profile
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Prepare the body for API call
        const requestBody = {oldUsername: JSON.parse(localStorage.getItem('user')).username};
        if (newUsername) requestBody.newUsername = newUsername;
        if (newPassword) requestBody.newPassword = newPassword;

        try {
            const response = await fetch('/api/user/edituser', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }else {
              user.username = newUsername;
              localStorage.setItem("user", JSON.stringify(user)); 
            }

            // Redirect to profile page upon successful update
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    }

    // Render the edit profile form
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>Edit Profile:</h1>

            {/* Input field for new username */}
            <input 
                type="text"  
                onChange={(e) => setNewUsername(e.target.value)} // Update newUsername state on change
                placeholder="New Username"
                value={newUsername} // Set newUsername value from state
            />

            <br/>

            {/* Input field for new password */}
            <input 
                type="password"  
                onChange={(e) => setNewPassword(e.target.value)} // Update newPassword state on change
                placeholder="New Password"
                value={newPassword} // Set newPassword value from state
            />

            <br/>

            {/* Button for form submission */}
            <button>Update Profile</button>

            {/* Display error message if there is an error */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EditProfile;
