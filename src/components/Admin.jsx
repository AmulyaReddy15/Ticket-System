import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();   // prevents page reload
    navigate("/admin-dashboard");
  };

  return (

    <div className="form-container">

      <form className="form" onSubmit={handleLogin}>

        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Admin ID / Email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

};

export default Admin;