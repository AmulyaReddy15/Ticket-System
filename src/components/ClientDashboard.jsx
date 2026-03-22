import React, { useState } from "react";

const ClientDashboard = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showTickets, setShowTickets] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");

  const submitTicket = () => {

    if(!issue || !description || !domain){
      alert("Please fill all fields");
      return;
    }

    const newTicket = {
      issue: issue,
      description: description,
      domain: domain,
      date: new Date().toLocaleDateString(),
      status: "Not Resolved"
    };

    setTickets([...tickets, newTicket]);

    setIssue("");
    setDescription("");
    setDomain("");

    setShowPopup(false);
  };

  return (
    <div className="dashboard">

      <h2>Client Dashboard</h2>

      <div className="dashboard-buttons">

        <button onClick={()=>{
          setShowPopup(true)
          setShowTickets(false)
        }}>
          Raise New Ticket
        </button>

        <button onClick={()=>{
          setShowTickets(true)
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

        <button className="raise-send" onClick={submitTicket}>
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

              <p><b>Date:</b> {ticket.date}</p>

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