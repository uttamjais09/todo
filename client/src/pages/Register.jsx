import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const registerHandler = async () => {
        try {
            
            const res = await axios.post("https://todo-emlk.onrender.com/api/v1/user", user, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    return (
        <div className="container">
            <div className="mb-3">
                <input 
                    value={user.fullName} 
                    type="text" 
                    name="fullName" 
                    onChange={changeHandler} 
                    placeholder="Enter user name" 
                    className="form-control mb-2"
                />
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
                <button className="btn btn-primary" onClick={registerHandler}>Register</button>
                <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
