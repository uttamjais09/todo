import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


import Register from './pages/Register';


function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    }
    ,{
      path:"/",
      element:<Register/>
    }
  ])

    
  

  return (
    <div>
      <RouterProvider router={appRouter}/>
      <ToastContainer 
        position="top-right"
        autoClose={5000} // Close automatically after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    
    <ToastContainer />
    </div>
  );
}

export default App;

