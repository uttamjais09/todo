import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ userName }) => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://todo-emlk.onrender.com/api/v1/user/logout', {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/'); // Redirect to login page after successful logout
            }
        } catch (error) {
            console.error("Error during logout:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Hello, {userName}</span>
                <button className="btn btn-outline-danger" onClick={logoutHandler}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;


