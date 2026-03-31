import React, { useState } from "react";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom'; 
import './TechnicianDashboard.css';

const TechnicianDashboard = () => {
 const navigate = useNavigate();
  const [showIssues, setShowIssues] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("");

//  REPLACE const [tickets] = useState([...]) with two separate states:
  const [assignedTickets, setAssignedTickets] = useState([]);  // newly assigned by admin
  const [pendingTickets, setPendingTickets] = useState([]);    // not resolved + in progress

  // function for logout 
const logout = async () =>{
  try{
  const res = await axios.post(
      `${API}/techncicianlogout`,
      {},
      { withCredentials: true },
    );
    navigate("/");
  }catch (error) {
      console.error("Logout error:", error);
    } 

};
  //  FUNCTION 1 — load both assigned and pending tickets
  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        `${API}/pendingIssuesTechnician`,
        { withCredentials: true }
      );
      //  backend returns { assignedTickets: [...], pendingTickets: [...] }
      setAssignedTickets(res.data.assignedTickets);
      setPendingTickets(res.data.pendingTickets);
      setShowIssues(true);
    } catch (error) {
      if (error.response?.status === 404) {
        setAssignedTickets([]);
        setPendingTickets([]);
        setShowIssues(true);
      } else if (error.response?.status === 401) {
        alert("Please login first");
      }
    }
  };
  //  FUNCTION 2 — report solution + status to admin
  const reportToAdmin = async () => {
    if (solution.trim() === "") {
      alert("Please enter solution");
      return;
    }
    if (status === "") {
      alert("Please select status");
      return;
    }
    try {
      await axios.post(
        `${API}/reportToAdmin`,
        {
          issueid: selectedTicket.issueid,              // ✅ for update
    beforeTicketId: selectedTicket.beforeTicketId, // ✅ for first time
          status: status,                          //  AfterTicketT → private String status
          solution: solution,                      //  AfterTicketT → private String solution
          // clientid, issue, description, domain, techid
          // are all set by backend from session + BeforeTicketT automatically ✅
        },
        { withCredentials: true }
      );
      alert("Reported to Admin Successfully!");
      setSelectedTicket(null);
      setSolution("");
      setStatus("");
      fetchIssues();  //  refresh list after reporting
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please login first");
      } else {
        alert("Failed to report: " + error.response?.data);
      }
    }
  };





  return (
    <div className="dashboard">

       <div className="tech-header">
    <h2>Technician Dashboard</h2>
    <button className="logout-btn" onClick={logout}>Logout</button>
  </div>

      <button
        className="dashboard-btn"
        onClick={fetchIssues} 
      >
        View Issues to be Resolved
      </button>


{/* -------- FIRST POPUP (ISSUE LIST) -------- */}

{showIssues && (

<div className="tech-popup-overlay">
<div className="tech-popup">
<h3>Assigned Issues</h3>

{/*  SECTION 1 — newly assigned by admin (from BeforeTicketT) */}
      {assignedTickets.length === 0 && <p>No new assigned issues</p>}
{assignedTickets.map((ticket,index)=>(

<div
key={index}
className="issue-row"
onClick={()=>{
  setSelectedTicket(ticket)
  setStatus("")
}}
>

<p><b>Issue:</b> {ticket.issue}</p>

<p><b>Issue Date:</b>  {new Date(ticket.issueDate).toLocaleDateString()}</p>

<p><b>Description:</b> {ticket.description}</p>

</div>

))}
     {/*  SECTION 2 — in progress / not resolved (from AfterTicketT) */}
      {/* <h3 style={{marginTop:"15px"}}>In Progress / Not Resolved</h3> */}
      {pendingTickets.length === 0 && <p>No pending issues</p>}
      {pendingTickets.map((ticket, index) => (
        <div
          key={index}
          className="issue-row"
          onClick={() => {
            setSelectedTicket(ticket);
            setStatus(ticket.status);
          }}
        >
          <p><b>Issue:</b> {ticket.issue}</p>
          <p><b>Date:</b> {new Date(ticket.issudedate).toLocaleDateString()}</p>  {/*  issudedate from AfterTicketT */}
          <p><b>Description:</b> {ticket.description}</p>
        </div>
      ))}

<button
className="close-popup"
onClick={()=>setShowIssues(false)}>
Close
</button>

</div>

</div>

)}



{/* -------- SECOND POPUP (FULL DETAILS) -------- */}

{selectedTicket && (

<div className="tech-popup-overlay">

<div className="tech-popup">

<h3>Issue Details</h3>

<p><b>Issue:</b> {selectedTicket.issue}</p>

      {/* 🔌 date field differs between BeforeTicketT and AfterTicketT */}
      <p><b>Date:</b> {new Date(
        selectedTicket.issueDate || selectedTicket.issudedate  // 🔌 handles both tables
      ).toLocaleDateString()}</p>

<p><b>Description:</b> {selectedTicket.description}</p>

<p><b>Domain:</b> {selectedTicket.domain}</p>


{/* STATUS DROPDOWN */}

<label><b>Status:</b></label>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="">Select Status</option>
<option value="Not Resolved">Not Resolved</option>
<option value="In Progress">In Progress</option>
<option value="Resolved">Resolved</option>

</select>


<textarea
placeholder="Enter Solution"
value={solution}
onChange={(e)=>setSolution(e.target.value)}
/>


<div className="tech-actions">

<button onClick={reportToAdmin}>
Report to Admin
</button>

<button onClick={()=>setSelectedTicket(null)}>
Cancel
</button>

</div>

</div>

</div>

)}

    </div>
  );
};

export default TechnicianDashboard;