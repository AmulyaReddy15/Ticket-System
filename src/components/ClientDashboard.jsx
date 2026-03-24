import React, { useState  } from "react";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';  


const navigate = useNavigate();  

const ClientDashboard = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showTickets, setShowTickets] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");

// view tikets function
const fetchTickets = async () => {
  try {
    const res = await axios.get(
      `${API}/viewstatusClient`,
      { withCredentials: true }
    );
    setTickets(res.data);
    setShowTickets(true);
  } catch (error) {
    if (error.response?.status === 401) {
      alert("Please login first");
    } else if (error.response?.status === 404) {
      setTickets([]);       // no tickets yet — shows "No Tickets Raised"
      setShowTickets(true);
    }
  }
};
// function for logout 
const logout = async () =>{
  try{
  const res = await axios.post(
      `${API}/clientlogout`,
      {},
      { withCredentials: true },
    );
    navigate("/");
  }catch (error) {
      console.error("Logout error:", error);
    } 

};

  const raiseTicket = async () => {

    if(!issue || !description || !domain){
      alert("Please fill all fields");
      return;
    }

try {
    await axios.post(
      `${API}/RaiseTicket`,
      {
        issue: issue,              //  matches BeforeTicketT → private String issue
        description: description,  //  matches BeforeTicketT → private String description
        domain: domain             //  matches BeforeTicketT → private String domain
        // clientid is set by backend from session automatically 
        // issueDate is set by @CreationTimestamp automatically 
        // status defaults to "pending" automatically 
        // assigned defaults to false automatically 
      },
      { withCredentials: true }    //  CRITICAL — sends session so backend knows which client
    );
    alert("Ticket Raised Successfully!");
    setIssue("");
    setDescription("");
    setDomain("");
    setShowPopup(false);
  } catch (error) {
    if (error.response?.status === 401) {
      alert("Please login first");
    } else {
      alert("Failed to raise ticket: " + (error.response?.data?.message || JSON.stringify(error.response?.data)));
    }
  }
  };

  return (
    <div className="dashboard">

      <h2>Client Dashboard</h2>

         <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      <div className="dashboard-buttons">

        <button onClick={()=>{
          setShowPopup(true)
          setShowTickets(false)
        }}>
          Raise New Ticket
        </button>

<button onClick={() => {
  fetchTickets();
  setShowPopup(false);
}}>
  View Tickets
</button>

      </div>


      {/* Raise Ticket Popup */}

     {showPopup && (
  <div className="raise-ticket-overlay">

    <div className="raise-ticket-box">

      <h3 className="raise-ticket-title">Raise New Ticket</h3>

      <input
        className="raise-input"
        placeholder="Issue"
        value={issue}
        onChange={(e)=>setIssue(e.target.value)}
      />

      <textarea
        className="raise-textarea"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <select
        className="raise-select"
        value={domain}
        onChange={(e)=>setDomain(e.target.value)}
      >
        <option value="">Select Domain</option>
        <option>Hardware Support</option>
        <option>Software and Application Support</option>
        <option>Network and Connectivity Issues</option>
        <option>Service Requests</option>
      </select>

      <div className="raise-ticket-buttons">

        <button className="raise-send" onClick={raiseTicket}>
          Raise
        </button>

        <button className="raise-cancel" onClick={()=>setShowPopup(false)}>
          Cancel
        </button>

      </div>

    </div>

  </div>
)}



      {/* View Tickets */}

      {showTickets && (

        <div className="ticket-list">

          <h3>Your Tickets</h3>

          {tickets.length === 0 && <p>No Tickets Raised</p>}

          {tickets.map((ticket,index)=>(
            <div key={index} className="ticket-card">

              <h4><b>Issue:</b>{ticket.issue}</h4>

              <p><b>Description:</b>{ticket.description}</p>

              <p><b>Domain:</b> {ticket.domain}</p>

              <p><b>Date:</b> {ticket.issudedate}</p>

              <p>
                <b>Status:</b> {ticket.status}
              </p>

            </div>
          ))}

        </div>

      )}

    </div>
  );
};

export default ClientDashboard;