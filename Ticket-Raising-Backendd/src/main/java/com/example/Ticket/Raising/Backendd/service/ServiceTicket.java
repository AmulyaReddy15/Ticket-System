package com.example.Ticket.Raising.Backendd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.Ticket.Raising.Backendd.dto.ClientDTO;
import com.example.Ticket.Raising.Backendd.dto.TechnicianDTO;
import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.model.ClientT;
import com.example.Ticket.Raising.Backendd.model.TechnicianT;
import com.example.Ticket.Raising.Backendd.repository.AfterRepo;
import com.example.Ticket.Raising.Backendd.repository.BeforeRepo;
import com.example.Ticket.Raising.Backendd.repository.ClientRepo;
import com.example.Ticket.Raising.Backendd.repository.TechnicianRepo;


import jakarta.servlet.http.HttpSession;

@Service
public class ServiceTicket {
	@Autowired
	private ClientRepo clientrepo;
	@Autowired
	private TechnicianRepo techrepo;
	@Autowired
	private BeforeRepo beforepo;
	@Autowired
	private AfterRepo afterepo;

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


	public ResponseEntity<?> techregister(TechnicianDTO techrequest) {
	   TechnicianT technician = new TechnicianT();
	   technician.setName(techrequest.getName());
	   technician.setEmail(techrequest.getEmail());
	   technician.setPassword(techrequest.getPassword());
	   
	   techrepo.save(technician);
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


	public ResponseEntity<?> raiseTicket(BeforeTicketT beforeticket) {
	
		beforepo.save(beforeticket);
		
		return ResponseEntity
	            .status(HttpStatus.CREATED)
	            .body(" Ticket Raised Successfully");
	}


	public ResponseEntity<?> adminView(AfterTicketT afterticket) {
		List<AfterTicketT> ticketList = afterepo.findAll();
		if (ticketList.isEmpty()) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("No tickets found");
	    }
	    
	    return ResponseEntity
	            .ok(ticketList);  
	}

}
