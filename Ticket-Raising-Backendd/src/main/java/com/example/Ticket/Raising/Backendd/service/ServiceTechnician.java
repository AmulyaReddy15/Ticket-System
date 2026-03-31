package com.example.Ticket.Raising.Backendd.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.Ticket.Raising.Backendd.dto.TechnicianDTO;
import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.model.TechnicianT;
import com.example.Ticket.Raising.Backendd.repository.AfterRepo;
import com.example.Ticket.Raising.Backendd.repository.BeforeRepo;
import com.example.Ticket.Raising.Backendd.repository.TechnicianRepo;

import jakarta.servlet.http.HttpSession;

@Service
public class ServiceTechnician {

	@Autowired
	private TechnicianRepo techrepo;
	@Autowired
	private BeforeRepo beforepo;
	@Autowired
	private AfterRepo afterepo;
	


		
//		technician register,login and logout=========================================
		public ResponseEntity<?> technicianRegister(TechnicianDTO techrequest) {
			TechnicianT tech = new TechnicianT();
			
			tech.setName(techrequest.getName());
			tech.setEmail(techrequest.getEmail());
			tech.setDomain(techrequest.getDomain());
			tech.setPassword(techrequest.getPassword());
			
			techrepo.save(tech);
			return ResponseEntity.status(HttpStatus.CREATED)
	                .body("Registered Successfully");
		}


		public ResponseEntity<?> techncicianLogin(TechnicianDTO techrequest, HttpSession session) {
			TechnicianT technician = techrepo
					.findByEmail(techrequest.getEmail())
					.orElse(null);
					
			if(technician==null) {
				return ResponseEntity
		                .status(HttpStatus.NOT_FOUND)
		                .body("User not found");
			}
			if(!technician.getPassword().equals(techrequest.getPassword())) {
				return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body("Invalid password");
			}
			session.setAttribute("technician", technician);
			return ResponseEntity.ok("Technician Login successful");
		}


		public ResponseEntity<?> techncicianLogout(HttpSession session) {
			session.invalidate();
			return ResponseEntity.ok("Technician Logged out successful");
		}



//	technician ui apis-------------------------------------------------------
	public ResponseEntity<?> pendingIssues(HttpSession session) {
		
		TechnicianT technician = (TechnicianT) session.getAttribute("technician");
		if (technician == null) {
		    return ResponseEntity
		            .status(HttpStatus.UNAUTHORIZED)
		            .body("Technician not logged in");
		}
		List<BeforeTicketT> assignedticketslist = beforepo.findByassignedAndTechid(true,technician.getTechid());
//		display assigned issues only 
		List<AfterTicketT> remainingtickets = afterepo.findByStatusInAndTechid(List.of("Not Resolved", "In Progress"),technician.getTechid());
//		along with pending(not resolved and inprogress) issues
		if (assignedticketslist.isEmpty() && remainingtickets.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("No tickets found");
	    }
	    Map<String, Object> response = new HashMap<>();
	    response.put("assignedTickets", assignedticketslist);
	    response.put("pendingTickets", remainingtickets);
	    return ResponseEntity
	            .ok(response); 
	}
	
	public ResponseEntity<?> reportToAdmin(AfterTicketT afterticket, HttpSession session) {
	    
	    TechnicianT technician = (TechnicianT) session.getAttribute("technician");
	    if (technician == null) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("Technician not logged in");
	    }
	 //  Try to get existing AfterTicket
	 // ✅ Only check existing if issueid is present (update case)
	    AfterTicketT existing = null;
	    if (afterticket.getIssueid() != null) {
	        existing = afterepo.findById(afterticket.getIssueid()).orElse(null);
	    }

	    if (existing != null) {
	        // ✅ Ticket already in After table → just update
	        existing.setStatus(afterticket.getStatus());
	        existing.setSolution(afterticket.getSolution()); // if you have

	        afterepo.save(existing);

	        return ResponseEntity.ok("Updated Successfully");
	    }

	    // fetch original before ticket
	    BeforeTicketT before = beforepo.findById(afterticket.getBeforeTicketId())
//	    		when frontend sends beforeTicketId: 5, Spring maps it into afterticket.beforeTicketId = 5 and then your backend uses that id to fetch from BeforeTicket table.
	                    .orElseThrow(() -> new RuntimeException("Ticket not found"));
	    
	    // carry over from BeforeTicket
	    afterticket.setClientid(before.getClientid());
	    afterticket.setIssue(before.getIssue());
	    afterticket.setDescription(before.getDescription());
	    afterticket.setIssudedate(before.getIssudedate());
	    		
	    
	    // carry over from session
	    afterticket.setTechid(technician.getTechid());
	    afterticket.setDomain(technician.getDomain());
	    
	    // status and solution come from frontend as it is
	    afterepo.save(afterticket);

	    if (afterticket.getStatus().equalsIgnoreCase("in progress")||afterticket.getStatus().equalsIgnoreCase("not resolved") || afterticket.getStatus().equalsIgnoreCase("Resolved")) {
	        beforepo.deleteById(afterticket.getBeforeTicketId());
	    }

	    return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body("Reported to Admin Successfully");
	}



	}

















