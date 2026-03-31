package com.example.Ticket.Raising.Backendd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.model.TechnicianT;
import com.example.Ticket.Raising.Backendd.repository.AfterRepo;
import com.example.Ticket.Raising.Backendd.repository.BeforeRepo;
import com.example.Ticket.Raising.Backendd.repository.TechnicianRepo;

import jakarta.servlet.http.HttpSession;

@Service
public class ServiceAdmin {
	
	@Autowired
	private TechnicianRepo techrepo;
	@Autowired
	private BeforeRepo beforepo;
	@Autowired
	private AfterRepo afterepo;
	
	//admin login and logout==========================================================
			public ResponseEntity<?> adminLogin(String username, String password, HttpSession session) {
			    if (username.equals("admin") && password.equals("admin123")) {
			        session.setAttribute("admin", "admin");
			        return ResponseEntity.ok("Admin login successful");
			    }
			    return ResponseEntity
			            .status(HttpStatus.UNAUTHORIZED)
			            .body("Invalid admin credentials");
			}

			public ResponseEntity<?> adminLogout(HttpSession session) {
			    session.invalidate();
			    return ResponseEntity.ok("Admin logged out successfully");
			}
			
//			admin ui apis-----------------------------------------------------------
			public ResponseEntity<?> pendingIssuesAdmin(HttpSession session) {
				
				String admin = (String) session.getAttribute("admin");
				if (admin == null) {
				    return ResponseEntity
				            .status(HttpStatus.UNAUTHORIZED)
				            .body("Admin not logged in");
				}
				List<BeforeTicketT> pendingticketslist = beforepo.findAll();
//				gets issues from beforeticket table
				
				if(pendingticketslist.isEmpty()) {
					return ResponseEntity
			                .status(HttpStatus.NOT_FOUND)
			                .body("No tickets found");
				}
				return ResponseEntity
			            .ok(pendingticketslist);
			}
			
			
			public ResponseEntity<?> avialableTechnician(Integer issueid,HttpSession session) {
				String admin = (String) session.getAttribute("admin");
				if (admin == null) {
				    return ResponseEntity
				            .status(HttpStatus.UNAUTHORIZED)
				            .body("Admin not logged in");
				}
				 Optional<BeforeTicketT> beforeticket = beforepo.findById(issueid);
					if(beforeticket.isEmpty()) {
						return ResponseEntity
				                .status(HttpStatus.NOT_FOUND)
				                .body("No tickets found");
					}
					BeforeTicketT ticket = beforeticket.get();
				List<TechnicianT> availableTechnicians = techrepo.findByDomain(ticket.getDomain());
				
				 if (availableTechnicians.isEmpty()) {
				        return ResponseEntity
				                .status(HttpStatus.NOT_FOUND)
				                .body("No technicians available for this domain");
				    }

				    return ResponseEntity.ok(availableTechnicians);
			}
			
			
			
			public ResponseEntity<?> issuedToTechnician(Integer issueid,Integer techid, HttpSession session) {
				String admin = (String) session.getAttribute("admin");
				if (admin == null) {
				    return ResponseEntity
				            .status(HttpStatus.UNAUTHORIZED)
				            .body("Admin not logged in");
				}
				 Optional<BeforeTicketT> beforeticket = beforepo.findById(issueid);
				if(beforeticket.isEmpty()) {
					return ResponseEntity
			                .status(HttpStatus.NOT_FOUND)
			                .body("No tickets found");
				}
				
		        Optional<TechnicianT> technician = techrepo.findById(techid);		
		        if(technician.isEmpty()) {
		        	return ResponseEntity
			                .status(HttpStatus.NOT_FOUND)
			                .body("No technician available for this domain");
		        }
		        BeforeTicketT ticket = beforeticket.get();
		        TechnicianT tech = technician.get();
		        
				ticket.setAssigned(true);
				ticket.setTechid(tech.getTechid());
				beforepo.save(ticket);  //button to assign particular issues to technician accordingly 
				
				
				return ResponseEntity
			            .ok("Technician can view and resolve issue");  
			}
			
			public ResponseEntity<?> adminView(HttpSession session) {
				
				String admin = (String) session.getAttribute("admin");
				if (admin == null) {
				    return ResponseEntity
				            .status(HttpStatus.UNAUTHORIZED)
				            .body("Admin not logged in");
				}
				List<AfterTicketT> ticketList = afterepo.findAll();
//				gets all the not resolved,resolved,inprogress issues details display
				if (ticketList.isEmpty()) {
			        return ResponseEntity
			                .status(HttpStatus.NOT_FOUND)
			                .body("No tickets found");
			    }
			    
			    return ResponseEntity
			            .ok(ticketList);  
			}

			public ResponseEntity<?> reportToClient(Integer issueid,HttpSession session) {
				String admin = (String) session.getAttribute("admin");
				if (admin == null) {
				    return ResponseEntity
				            .status(HttpStatus.UNAUTHORIZED)
				            .body("Admin not logged in");
				}
				Optional<AfterTicketT> issueobject = afterepo.findById(issueid);
				AfterTicketT issue = issueobject.get();
				issue.setClientView(true);
				afterepo.save(issue);
				return ResponseEntity
			            .ok("client can view the status");
			}

			

}
