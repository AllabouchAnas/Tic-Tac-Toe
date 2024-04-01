import { useState, useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { register, isLoading, error, redirect } = useRegister(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const success = await register(username, password); 
    }

    useEffect(() => {
        if (redirect) {
            navigate('/'); 
        }
    }, [redirect, navigate]);

    return (
        <form className="login" onSubmit={ handleSubmit }>
            <h1>Register:</h1>

            <input 
                type="text"  
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username"
                value={username}
            />

            <br/>

            <input 
                type="password"  
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
                value={password} 
            />

            <br/>
            <label>Upload your profile photo:</label>
            <input
                type="file"
                name="fileUpload"
                id="fileUpload"
            />

            <br/>

            <button disabled={ isLoading }>Register</button>

            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default Register;
