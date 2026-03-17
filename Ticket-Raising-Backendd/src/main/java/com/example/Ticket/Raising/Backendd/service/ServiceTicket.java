package com.example.Ticket.Raising.Backendd.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Ticket.Raising.Backendd.dto.ClientDTO;
import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.model.ClientT;
import com.example.Ticket.Raising.Backendd.repository.AfterRepo;
import com.example.Ticket.Raising.Backendd.repository.BeforeRepo;
import com.example.Ticket.Raising.Backendd.repository.ClientRepo;


import jakarta.servlet.http.HttpSession;

@Service
public class ServiceTicket {
	@Autowired
	private ClientRepo clientrepo;
	@Autowired
	private BeforeRepo beforepo;
	@Autowired
	private AfterRepo afterepo;

//	registers and login--------------------------------------------------------------
	
	public ResponseEntity<?> clientregister(ClientDTO clientrequest) {
		
	    // ✅ Add this check
//	    if (clientrepo.findByEmail(clientrequest.getEmail()).isPresent()) {
//	        return ResponseEntity.status(HttpStatus.CONFLICT)
//	                .body("Email already registered");
//	    }
		ClientT client = new ClientT();
		client.setName(clientrequest.getName());
		client.setEmail(clientrequest.getEmail());
		client.setPassword(clientrequest.getPassword());
		
		clientrepo.save(client);
		
		return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registered Successfully");
	}


	public ResponseEntity<?> clientlogin(ClientDTO clientrequest, HttpSession session) {
		ClientT client =  clientrepo
				.findByEmail(clientrequest.getEmail())
				.orElse(null);
		
		if (client == null) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("User not found");
	    }
		
		// Compare plain passwords directly
		if (!clientrequest.getPassword().equals(client.getPassword())) {

		    return ResponseEntity
		            .status(HttpStatus.UNAUTHORIZED)
		            .body("Invalid password");
		}

		// Store user in session
		session.setAttribute("client",client);

		return ResponseEntity.ok("Client Login successful");
	}

//client ui apis--------------------------------------------------------------
	public ResponseEntity<?> raiseTicket(BeforeTicketT beforeticket, HttpSession session) {
        ClientT client = (ClientT) session.getAttribute("client");
        if (client == null) return ResponseEntity.ok("Session is EMPTY");
        beforeticket.setClientid(client.getId());
		//		ClientT client = (ClientT) session.getAttribute("client");)
		beforepo.save(beforeticket);   //will store raised issues in beforeticket table
		
		return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body(" Ticket Raised Successfully");
	}
	
	
	
	public ResponseEntity<?> clientViewStatus(HttpSession session) {
		
		ClientT client = (ClientT) session.getAttribute("client");
	    List<AfterTicketT> ticketstatusList = afterepo.findByClientid(client.getId());

//		gets all the not resolved,resolved,inprogress issues details display
		
		if (ticketstatusList.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("No tickets found");
	    }
	    
	    return ResponseEntity
	            .ok(ticketstatusList); 
	}

//	admin ui apis-----------------------------------------------------------
	public ResponseEntity<?> pendingIssuesAdmin() {
		List<BeforeTicketT> pendingticketslist = beforepo.findAll();
//		gets issues from beforeticket table
		
		if(pendingticketslist.isEmpty()) {
			return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("No tickets found");
		}
		return ResponseEntity
	            .ok(pendingticketslist);
	}
	
	public ResponseEntity<?> issuedToTechnician(BeforeTicketT beforeticket) {
		beforeticket.setAssigned(true);
		
		beforepo.save(beforeticket);  //button to assign particular issues to technician accordingly 
		return ResponseEntity
	            .ok("Technician can view and resolve issue");  
	}
	
	public ResponseEntity<?> adminView() {
		List<AfterTicketT> ticketList = afterepo.findAll();
//		gets all the not resolved,resolved,inprogress issues details display
		if (ticketList.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("No tickets found");
	    }
	    
	    return ResponseEntity
	            .ok(ticketList);  
	}
	
//	public ResponseEntity<?> reportToClient(AfterTicketT afterticket) {
//		afterticket.setVisibleToClient(true);
//		afterepo.save(afterticket);
//		return ResponseEntity
//	            .ok("client can view the status");
//	}

//	technician ui apis-------------------------------------------------------
	public ResponseEntity<?> pendingIssues() {
		
		List<BeforeTicketT> assignedticketslist = beforepo.findByassigned(true);
//		display assigned issues only 
		List<AfterTicketT> remainingtickets = afterepo.findByStatusIn(List.of("Not resolved", "In progress"));
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

	public ResponseEntity<?> reportToAdmin(AfterTicketT afterticket) {
		// fetch original before ticket to get clientId
	    BeforeTicketT before = beforepo.findById(afterticket.getBeforeTicketId())
	                    .orElseThrow(() -> new RuntimeException("Ticket not found"));
	    afterticket.setClientid(before.getClientid()); // carry over clientId
		    afterepo.save(afterticket);
//			save the updated status , solution and issueid(from frontend) issue,description fields to afterticket table

		    if (afterticket.getStatus().equalsIgnoreCase("Resolved")) {
		        beforepo.deleteById(afterticket.getBeforeTicketId());
		    }//		delete the issues that are acknowledged by technician from before ticket table


		    return ResponseEntity
		            .status(HttpStatus.CREATED)
		            .body("Reported to Admin Successfully");
		}

	}

















