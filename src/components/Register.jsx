import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;
const Register = () => {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");

    //  matches ClientDTO fields exactly
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  technician has one extra field: domain
const [techName, setTechName] = useState("");
const [techEmail, setTechEmail] = useState("");
const [techPassword, setTechPassword] = useState("");

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
  const handleClientRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/clientregister`, {
        name: name,        // 🔌 matches ClientDTO → private String name
        email: email,      // 🔌 matches ClientDTO → private String email
        password: password // 🔌 matches ClientDTO → private String password
      });
      alert("Registered Successfully!");
      navigate("/login", { state: { role: "client" } });
    } catch (error) {
      alert("Registration failed: " + error.response?.data);
    }
  };

  /* Technician Register */
  const handleTechRegister = async (e) => {

    e.preventDefault();

    if (!domain) {
      alert("Please select a domain");
      return;
    }

      try {
    await axios.post(`${API}/techncicianRegister`, {
      name: techName,        // 🔌 matches TechnicianDTO → private String name
      email: techEmail,      // 🔌 matches TechnicianDTO → private String email
      password: techPassword,// 🔌 matches TechnicianDTO → private String password
      domain: domain         // 🔌 matches TechnicianDTO → private String domain
    });
    alert("Technician Registered Successfully!");
    navigate("/login", { state: { role: "technician" } });
  } catch (error) {
    alert("Registration failed: " + error.response?.data);
  }

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
            placeholder="Client name"
            value={name}                  // 🔌 ADD
            onChange={(e) => setName(e.target.value)}  // 🔌 ADD
            required
          />

          <input
            type="email"
            placeholder=" Email"
            value={email}                 // 🔌 ADD
            onChange={(e) => setEmail(e.target.value)}  // 🔌 ADD
            required
          />

          <input
            type="password"
            placeholder=" Password"
            value={password}              // 🔌 ADD
            onChange={(e) => setPassword(e.target.value)} 
            required
          />

          {/* <input
            type="password"
            placeholder="Confirm Password"
            required
          /> */}

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
  placeholder="Name"       //  CHANGE from "Technician ID"
  value={techName}                     //  ADD
  onChange={(e) => setTechName(e.target.value)}  //  ADD
  required
/>

<input
  type="email"
  placeholder=" Email"
  value={techEmail}                    //  ADD
  onChange={(e) => setTechEmail(e.target.value)}  //  ADD
  required
/>

<input
  type="password"
  placeholder=" Password"
  value={techPassword}                 // ADD
  onChange={(e) => setTechPassword(e.target.value)}  //  ADD
  required
/>

{/* domain select already has value={domain} and onChange — keep as is ✅ */}

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