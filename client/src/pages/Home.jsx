import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [userName, setUserName] = useState("User"); // Sample user name
    const [editingTodo, setEditingTodo] = useState(null); // State to manage the todo being edited

    const addTodoHandler = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/v1/todo', { 
                title, 
                description 
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
    
            if (res && res.data && res.data.success) {
                toast.success(res.data.message);
                getAllTodo(); // Fetch updated list of todos
                setTitle(""); // Reset the title input
                setDescription(""); // Reset the description input
            } else {
                toast.error("Unexpected response structure");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    const getAllTodo = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/todo/', {
                withCredentials: true, // Include this if your backend requires authentication
            });
            setTodos(res.data.todos); // Update state with fetched todos
            toast.success("Fetched all todos successfully");
        } catch (error) {
            console.error("Error fetching todos:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    const editTodoHandler = (todo) => {
        setEditingTodo(todo); // Set the todo being edited
        setTitle(todo.title); // Set the title input to the todo title
        setDescription(todo.description); // Set the description input to the todo description
    };

    const updateTodoHandler = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/api/v1/todo/${editingTodo._id}`, { 
                title, 
                description 
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
    
            if (res && res.data && res.data.success) {
                toast.success(res.data.message);
                getAllTodo(); // Fetch updated list of todos
                setEditingTodo(null); // Reset the editing state
                setTitle(""); // Reset the title input
                setDescription(""); // Reset the description input
            } else {
                toast.error("Unexpected response structure");
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    const deleteTodoHandler = async (todoId) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/todo/${todoId}`, {
                withCredentials: true,
            });
    
            if (res && res.data && res.data.success) {
                toast.success(res.data.message);
                getAllTodo(); // Fetch updated list of todos
            } else {
                toast.error("Unexpected response structure");
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred");
            }
        }
    };

    useEffect(() => {
        getAllTodo();
    }, []);

    return (
        <div className="container">
            <Navbar userName={userName} />
            <div className="mb-3">
                <input 
                    type="text" 
                    placeholder="Add a new todo" 
                    className="form-control mb-2" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Add a Description" 
                    className="form-control mb-2" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <button className="btn btn-primary" onClick={editingTodo ? updateTodoHandler : addTodoHandler}>
                    {editingTodo ? "Update Todo" : "Add Todo"}
                </button>
            </div>
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{todo.title} - {todo.description}</span>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => editTodoHandler(todo)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteTodoHandler(todo._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default Home;



