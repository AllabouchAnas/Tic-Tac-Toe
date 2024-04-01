import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin"; 
import './Auth.css'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, error, isLoading, redirect } = useLogin(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const success = await login(username, password); 
    }

    useEffect(() => {
        if (redirect) {
            navigate('/'); 
        }
    }, [redirect, navigate]);

    return (
        <form className="login" onSubmit={ handleSubmit }>
            <h1>Login:</h1>

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

            <button disabled={ isLoading }>Login</button>

            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default Login;
