import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
   
  return (
  <nav className="navbar">

      <h2 className="logo">TicketDesk</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
        
      </div>

    </nav>
  )
}

export default NavBar