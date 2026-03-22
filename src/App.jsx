import React from 'react';
import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Notfound from './components/Notfound';
import NavBar from './NavBar';
import Admin from './components/Admin';
import ClientDashboard from './components/ClientDashboard'
import TechnicianDashboard from "./components/TechnicianDashboard";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <div>
        <NavBar/>
        <Home/>
      </div>
    },
    {
      path:"/login",
      element:<div>
        <NavBar/>
        <Login/>
      </div>
    },
    {
      path:"/register",
      element:<div>
        <NavBar/>
        <Register/>
      </div>
    },
    {
        path:"/client",
        element:<div>
          <NavBar/>
          <ClientDashboard/>
        </div>
    },
    {
      path:"/technician",
      element:<div>
        <NavBar/>
        <TechnicianDashboard/>
      </div>
    },
    {
      path:"/admin-dashboard",
      element:<div>
        <NavBar/>
        <AdminDashboard/>
      </div>
    },
    {
       path:"/admin",
      element:<div>
        <NavBar/>
        <Admin/>
      </div>
    },
    {
      path: "*",
      element: (
        <div>
          <NavBar/>
          <Notfound/>
        </div>
      )
    }

  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App