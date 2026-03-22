import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [role, setRole] = useState("");

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

  const handleClientLogin = (e) => {
    e.preventDefault();
    navigate("/client");
  };

  /* Technician Login */

  const handleTechLogin = (e) => {
    e.preventDefault();
    navigate("/technician");
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
            placeholder="Client ID / Email"
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
            placeholder="Technician ID / Email"
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

          <p className="register-link">
            New user? <Link to="/register">Register</Link>
          </p>

        </form>
      )}

    </div>
  );
};

export default Login;