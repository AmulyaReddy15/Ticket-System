import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;


const Admin = () => {

  const navigate = useNavigate();

  //  ADD states
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();   // prevents page reload
   try {
    await axios.post(
      `${API}/adminlogin?username=${username}&password=${password}`,
      {},                          //  empty body — params are in URL because @RequestParam
      { withCredentials: true }
    );
    navigate("/admin-dashboard");
  } catch (error) {
    alert("Invalid credentials");
  }
  };

  return (

    <div className="form-container">

      <form className="form" onSubmit={handleLogin}>

        <h2>Admin Login</h2>

        <input
  type="text"
  placeholder="Admin Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}  //  ADD
  required
/>
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}  //  ADD
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