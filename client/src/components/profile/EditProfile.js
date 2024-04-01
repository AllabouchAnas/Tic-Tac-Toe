import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../authentication/pages/Auth.css';

const EditProfile = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>Edit Profile:</h1>

            <input 
                type="text"  
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New Username"
                value={newUsername} 
            />

            <br/>

            <input 
                type="password"  
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="New Password"
                value={newPassword} 
            />

            <br/>

            <button>Update Profile</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EditProfile;
