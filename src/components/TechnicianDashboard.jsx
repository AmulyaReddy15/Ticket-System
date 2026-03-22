import React, { useState } from "react";

const TechnicianDashboard = () => {

  const [showIssues, setShowIssues] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("");

  const [tickets] = useState([
    {
      issue: "Login Problem",
      description: "User cannot login to account",
      date: "19/03/2026",
      domain: "Software and Application Support",
      status: "Not Resolved"
    },
    {
      issue: "Printer Not Working",
      description: "Printer not responding",
      date: "18/03/2026",
      domain: "Hardware Support",
      status: "Not Resolved"
    }
  ]);


  const reportToAdmin = () => {

    if(solution.trim() === ""){
      alert("Please enter solution");
      return;
    }

    if(status === ""){
      alert("Please select status");
      return;
    }

    alert("Issue Updated and Reported to Admin");

    setSelectedTicket(null);
    setSolution("");
    setStatus("");
  };


  return (
    <div className="dashboard">

      <h2>Technician Dashboard</h2>

      <button
        className="dashboard-btn"
        onClick={()=>setShowIssues(true)}
      >
        View Issues to be Resolved
      </button>


{/* -------- FIRST POPUP (ISSUE LIST) -------- */}

{showIssues && (

<div className="tech-popup-overlay">

<div className="tech-popup">

<h3>Assigned Issues</h3>

{tickets.map((ticket,index)=>(

<div
key={index}
className="issue-row"
onClick={()=>{
  setSelectedTicket(ticket)
  setStatus(ticket.status)
}}
>

<p><b>Issue:</b> {ticket.issue}</p>

<p><b>Issue Date:</b> {ticket.date}</p>

<p><b>Description:</b> {ticket.description}</p>

</div>

))}

<button
className="close-popup"
onClick={()=>setShowIssues(false)}
>
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

<p><b>Issue Date:</b> {selectedTicket.date}</p>

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