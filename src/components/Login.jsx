import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;


const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [role, setRole] = useState("");

    // name not needed for login, only email+password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  ADDED — separate states for technician login
const [techEmail, setTechEmail] = useState("");
const [techPassword, setTechPassword] = useState("");

  useEffect(() => {

    if(location.state?.role === "client"){
      setRole("client");
      setShowPopup(false);
    }

    else if(location.state?.role === "technician"){
      setRole("technician");
      setShowPopup(false);
    }

    else{
      setShowPopup(true);
      setRole("");
    }

  }, [location]);

  const handleRole = (selectedRole) => {
    setRole(selectedRole);
    setShowPopup(false);
  };

  const closePopup = () => {
    navigate(-1);
  };

  /* Client Login */

  const handleClientLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/clientlogin`,
        {
          email: email,      //  matches ClientDTO → private String email
          password: password //  matches ClientDTO → private String password
        },
        { withCredentials: true }  //  CRITICAL — sends session cookie to backend
      );
      alert(res.data);  // shows "Client Login successful"
      navigate("/client");
    } catch (error) {
      if (error.response?.status === 404) {
        alert("User not found");
      } else if (error.response?.status === 401) {
        alert("Invalid password");
      } else {
        alert("Login failed");
      }
    }
  };

  /* Technician Login */

  const handleTechLogin = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post(
      `${API}/techncicianlogin`,    //  note the typo — matches your backend exactly
      {
        email: techEmail,           //  matches TechnicianDTO → private String email
        password: techPassword      //  matches TechnicianDTO → private String password
      },
      { withCredentials: true }     //  CRITICAL — sends session cookie
    );
    alert(res.data);
    navigate("/technician");
  } catch (error) {
    if (error.response?.status === 404) {
      alert("Technician not found");
    } else if (error.response?.status === 401) {
      alert("Invalid password");
    } else {
      alert("Login failed: " + error.response?.data);
    }
  }
  };

  return (
    <div className="login-page">

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-box">

            <span className="close-btn" onClick={closePopup}>❌</span>

            <h3>Select Login Type</h3>

            <button onClick={() => handleRole("client")}>
              Client
            </button>

            <button onClick={() => handleRole("technician")}>
              Technician
            </button>

          </div>

        </div>
      )}

      {/* Client Login */}
      {role === "client" && (
        <form className="form" onSubmit={handleClientLogin}>

          <h2>Client Login</h2>

          <input
           type="text"
           placeholder="Client Email"
           value={email}                          //  ADD
           onChange={(e) => setEmail(e.target.value)}  //  ADD
           required
          />

         <input
          type="password"
           placeholder="Password"
           value={password}                            //  ADD
           onChange={(e) => setPassword(e.target.value)}  //  ADD
          required
          />

          <button type="submit">
            Login
          </button>

          <p className="register-link">
            New user? <Link to="/register">Register</Link>
          </p>

        </form>
      )}

      {/* Technician Login */}
      {role === "technician" && (
        <form className="form" onSubmit={handleTechLogin}>

          <h2>Technician Login</h2>

<input
  type="text"
  placeholder="Technician Email"
  value={techEmail}                        //  ADD
  onChange={(e) => setTechEmail(e.target.value)}  //  ADD
  required
/>

<input
  type="password"
  placeholder="Password"
  value={techPassword}                          //  ADD
  onChange={(e) => setTechPassword(e.target.value)}  //  ADD
  required
/>

          <button type="submit">
            Login
          </button>

          <p className="register-link">
            New user? <Link to="/register">Register</Link>
          </p>

        </form>
      )}

    </div>
  );
};

export default Login;