import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        try {
            const res = await axios.post("https://todo-1-584x.onrender.com/api/v1/user/login", user, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,  // Automatically close after 5 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        
                navigate('/home');
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,  // Automatically close after 5 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("An error occurred", {
                    position: "top-right",
                    autoClose: 5000,  // Automatically close after 5 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className="container">
            <div className="mb-3">
                <input 
                    value={user.email} 
                    type="text" 
                    name="email" 
                    onChange={changeHandler} 
                    placeholder="Email" 
                    className="form-control mb-2"
                />
                <input 
                    value={user.password} 
                    type="password" 
                    name="password" 
                    onChange={changeHandler} 
                    placeholder="Password" 
                    className="form-control mb-2"
                />
                <button className="btn btn-primary" onClick={loginHandler}>Login</button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Register</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;

