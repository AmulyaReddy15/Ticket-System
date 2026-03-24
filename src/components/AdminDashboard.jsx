import React, { useState , useEffect} from "react";
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;



const AdminDashboard = () => {

  const [showPending, setShowPending] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  //   two separate states:
  const [pendingTickets, setPendingTickets] = useState([]);  // from BeforeTicketT
  const [statusTickets, setStatusTickets] = useState([]);    // from AfterTicketT

  // function for logout 
const logout = async () =>{
  try{
  const res = await axios.post(
      `${API}/adminlogout`,
      {},
      { withCredentials: true },
    );
    navigate("/");
  }catch (error) {
      console.error("Logout error:", error);
    } 

};
    //  FUNCTION 1 — load pending issues (BeforeTicketT list)
  const fetchPendingIssues = async () => {
    try {
      const res = await axios.get(
        `${API}/getAllPendingIssuesAdmin`,
        { withCredentials: true }
      );
      setPendingTickets(res.data);  //  List<BeforeTicketT> from backend
      setShowPending(true);
      setShowStatus(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setPendingTickets([]);
        setShowPending(true);
      } else if (error.response?.status === 401) {
        alert("Admin not logged in");
      }
    }
  };

    //  FUNCTION 2 — load issue status (AfterTicketT list)
  const fetchStatusIssues = async () => {
     console.log("Button clicked"); // ✅
    try {
      const res = await axios.get(
        `${API}/adminViewStatus`,
        { withCredentials: true }
      );
      console.log("API DATA:", res.data);  // ✅
      setStatusTickets(res.data);  //  List<AfterTicketT> from backend
      setShowStatus(true);
      setShowPending(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setStatusTickets([]);
        setShowStatus(true);
      } else if (error.response?.status === 401) {
        alert("Admin not logged in");
      }
    }
  };

   //  FUNCTION 3 — assign technician (uses issueid from BeforeTicketT)
  const assignTechnician = async (issueid) => {
    try {
      await axios.post(
        `${API}/assigneIssuestoTechnician?issueid=${issueid}`,
        {},                        //  empty body — issueid is @RequestParam in URL
        { withCredentials: true }
      );
      alert("Technician Assigned Successfully!");
      setSelectedTicket(null);
      fetchPendingIssues();        //  refresh list after assigning
    } catch (error) {
      if (error.response?.status === 404) {
        alert("No technician available for this domain");
      } else {
        alert("Failed to assign: " + error.response?.data);
      }
    }
  };

    //  FUNCTION 4 — report to client (uses issueid from AfterTicketT)
  const reportToClient = async (issueid) => {
    try {
      await axios.post(
        `${API}/reportToClient?issueid=${issueid}`,
        {},                        //  empty body — issueid is @RequestParam in URL
        { withCredentials: true }
      );
      alert("Reported to Client!");
      fetchStatusIssues();         //  refresh list after reporting
    } catch (error) {
      alert("Failed to report: " + error.response?.data);
    }
  };


  return (

    <div className="admin-dashboard">

      <h2 className="admin-h2">Admin Dashboard</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>

      <div className="admin-buttons">

        <button onClick={fetchPendingIssues}>
          View Pending Issues
        </button>

<button onClick={fetchStatusIssues}>
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

{pendingTickets.map((t,index)=>(

<div
className="ticket-row"
key={index}
onClick={()=>setSelectedTicket(t)}
>

<p><b>Issue:</b> {t.issue}</p>
<p><b>Date:</b>  {new Date(t.issueDate).toLocaleDateString()}</p>
<p><b>Domain:</b> {t.domain}</p>

</div>

))}

</div>

</div>

)}



{/* ---------- FULL DETAILS POPUP (FOR PENDING) ---------- */}

{selectedTicket && showPending &&(

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
<p><b>Date:</b>{new Date(selectedTicket.issueDate).toLocaleDateString()}</p>
<p><b>Domain:</b> {selectedTicket.domain}</p>
<p><b>Status:</b> {selectedTicket.status}</p>

<button className="assign-btn"
onClick={() => assignTechnician(selectedTicket.issueid)}>
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

{statusTickets.map((t,index)=>(

<div className="ticket-row" key={index}
onClick={() => setSelectedTicket(t)} >

<div className="ticket-basic">

<p><b>Issue:</b> {t.issue}</p>
<p><b>Date:</b>  {new Date(t.issudedate).toLocaleDateString()}</p>
<p><b>Status:</b> {t.status}</p>

</div>

</div>

))}

</div>

</div>

)}

{/* ---------- FULL DETAILS POPUP (FOR STATUS) ---------- */}

{selectedTicket && showStatus && (

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
<p><b>Date:</b> {new Date(selectedTicket.issueDate).toLocaleDateString()}</p>
<p><b>Domain:</b> {selectedTicket.domain}</p>
<p><b>Status:</b> {selectedTicket.status}</p>

<button
className="report-btn"
onClick={() => reportToClient(selectedTicket.issueid)}
>
Report to Client
</button>

</div>

</div>

)}

    </div>
  );
};

export default AdminDashboard;