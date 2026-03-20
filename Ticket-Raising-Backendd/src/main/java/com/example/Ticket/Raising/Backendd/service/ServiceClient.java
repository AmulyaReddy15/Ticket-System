package com.example.Ticket.Raising.Backendd.service;

import java.util.List;

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
public class ServiceClient {
	@Autowired
	private ClientRepo clientrepo;
	@Autowired
	private BeforeRepo beforepo;
	@Autowired
	private AfterRepo afterepo;
	
	
//	registers and login--------------------------------------------------------------
	
	public ResponseEntity<?> clientregister(ClientDTO clientrequest) {
		
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
		if(!clientrequest.getPassword().equals(client.getPassword())) {
			return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password");
	}
		 session.setAttribute("client", client);
	        return ResponseEntity.ok("Client Login successful");
	}
		
		public ResponseEntity<?> cleintlogout(HttpSession session) {
			session.invalidate();
			return 	ResponseEntity
					.ok("logged out succesfully");
		
	}
		
		//client ui apis--------------------------------------------------------------
		public ResponseEntity<?> raiseTicket(BeforeTicketT beforeticket, HttpSession session) {
	        ClientT client = (ClientT) session.getAttribute("client");
	        if (client == null) {
	        	ResponseEntity
	            .status(HttpStatus.UNAUTHORIZED)
	            .body("Please login first");
	        }
	        beforeticket.setClientid(client.getId());
			//		ClientT client = (ClientT) session.getAttribute("client");)
			beforepo.save(beforeticket);   //will store raised issues in beforeticket table
			
			return ResponseEntity
		            .status(HttpStatus.CREATED)
		            .body(" Ticket Raised Successfully");
		}
		
		
		
		public ResponseEntity<?> clientViewStatus(HttpSession session) {
			
			ClientT client = (ClientT) session.getAttribute("client");
			if (client == null) {
			    return ResponseEntity
			            .status(HttpStatus.UNAUTHORIZED)
			            .body("Please login first");
			}
		    List<AfterTicketT> ticketstatusList = afterepo.findByClientidAndClientView(client.getId(),true);

//			gets all the not resolved,resolved,inprogress issues details display
			
			if (ticketstatusList.isEmpty()) {
		        return ResponseEntity
		                .status(HttpStatus.NOT_FOUND)
		                .body("No tickets found");
		    }
		    
		    return ResponseEntity
		            .ok(ticketstatusList); 
		}

}
