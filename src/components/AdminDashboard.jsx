import React, { useState } from "react";

const AdminDashboard = () => {

  const [showPending, setShowPending] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      issue: "Printer not working",
      description: "Printer showing offline error",
      date: "19/03/2026",
      domain: "Hardware Support",
      status: "Not Resolved"
    },
    {
      issue: "Internet slow",
      description: "Network speed is very slow",
      date: "18/03/2026",
      domain: "Network and Connectivity Issues",
      status: "In Progress"
    }
  ];

  return (

    <div className="admin-dashboard">

      <h2 className="admin-h2">Admin Dashboard</h2>

      <div className="admin-buttons">

        <button
          onClick={()=>{
            setShowPending(true)
            setShowStatus(false)
          }}
        >
          View Pending Issues
        </button>

        <button
          onClick={()=>{
            setShowStatus(true)
            setShowPending(false)
          }}
        >
          View Issue Status
        </button>

      </div>


{/* ---------- Pending Issues (CLICK TO OPEN) ---------- */}

{showPending && (

<div className="admin-popup-overlay">

<div className="admin-popup">

<span
className="admin-close"
onClick={()=>setShowPending(false)}
>
❌
</span>

<h3>Pending Issues</h3>

{tickets.map((t,index)=>(

<div
className="ticket-row"
key={index}
onClick={()=>setSelectedTicket(t)}
>

<p><b>Issue:</b> {t.issue}</p>
<p><b>Date:</b> {t.date}</p>
<p><b>Domain:</b> {t.domain}</p>

</div>

))}

</div>

</div>

)}



{/* ---------- FULL DETAILS POPUP (FOR PENDING) ---------- */}

{selectedTicket && (

<div className="admin-popup-overlay">

<div className="admin-popup">

<span
className="admin-close"
onClick={()=>setSelectedTicket(null)}
>
❌
</span>

<h3>Issue Details</h3>

<p><b>Issue:</b> {selectedTicket.issue}</p>
<p><b>Description:</b> {selectedTicket.description}</p>
<p><b>Date:</b> {selectedTicket.date}</p>
<p><b>Domain:</b> {selectedTicket.domain}</p>
<p><b>Status:</b> {selectedTicket.status}</p>

<button className="assign-btn">
Assign Technician
</button>

</div>

</div>

)}



{/* ---------- ISSUE STATUS (HOVER TO OPEN) ---------- */}

{showStatus && (

<div className="admin-popup-overlay">

<div className="admin-popup">

<span
className="admin-close"
onClick={()=>setShowStatus(false)}
>
❌
</span>

<h3>Issue Status</h3>

{tickets.map((t,index)=>(

<div className="ticket-row" key={index}>

<div className="ticket-basic">

<p><b>Issue:</b> {t.issue}</p>
<p><b>Date:</b> {t.date}</p>
<p><b>Status:</b> {t.status}</p>

</div>

<div className="ticket-hover">

<p><b>Issue:</b> {t.issue}</p>
<p><b>Description:</b> {t.description}</p>
<p><b>Date:</b> {t.date}</p>
<p><b>Domain:</b> {t.domain}</p>
<p><b>Status:</b> {t.status}</p>

<button
className="report-btn"
onClick={()=>alert("Reported to client")}
>
Report to Client
</button>

</div>

</div>

))}

</div>

</div>

)}

    </div>
  );
};

export default AdminDashboard;