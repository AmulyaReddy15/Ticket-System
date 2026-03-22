import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setShowPopup(true);
    setRole("");
  }, []);

  const handleRole = (selectedRole) => {
    setRole(selectedRole);
    setShowPopup(false);
  };

  const closePopup = () => {
    navigate(-1);
  };

  /* Client Register */
  const handleClientRegister = (e) => {
    e.preventDefault();
    navigate("/login", { state: { role: "client" } });
  };

  /* Technician Register */
  const handleTechRegister = (e) => {

    e.preventDefault();

    if (!domain) {
      alert("Please select a domain");
      return;
    }

    navigate("/login", { state: { role: "technician" } });

  };

  return (
    <div className="register-page">

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-box">

            <span className="close-btn" onClick={closePopup}>❌</span>

            <h3>Select Registration Type</h3>

            <button onClick={() => handleRole("client")}>
              Client
            </button>

            <button onClick={() => handleRole("technician")}>
              Technician
            </button>

          </div>

        </div>
      )}

      {/* Client Registration */}
      {role === "client" && (
        <form className="form" onSubmit={handleClientRegister}>

          <h2>Client Registration</h2>

          <input
            type="text"
            placeholder="Client ID"
            required
          />

          <input
            type="email"
            placeholder="Client Email"
            required
          />

          <input
            type="password"
            placeholder="Client Password"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
          />

          <button type="submit">
            Register
          </button>

        </form>
      )}

      {/* Technician Registration */}
      {role === "technician" && (
        <form className="form" onSubmit={handleTechRegister}>

          <h2>Technician Registration</h2>

          <input
            type="text"
            placeholder="Technician ID"
            required
          />

          <input
            type="email"
            placeholder="Technician Email"
            required
          />

          <input
            type="password"
            placeholder="Technician Password"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
          />

          <select
            value={domain}
            onChange={(e)=>setDomain(e.target.value)}
            required
          >
            <option value="">Select Domain</option>
            <option>Hardware Support</option>
            <option>Software and Application Support</option>
            <option>Network and Connectivity Issues</option>
            <option>Service Requests</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>
      )}

    </div>
  );
};

export default Register;