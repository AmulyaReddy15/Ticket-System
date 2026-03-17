package com.example.Ticket.Raising.Backendd.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ticket.Raising.Backendd.dto.ClientDTO;
import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.service.ServiceTicket;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
public class TicketController {
	
	@Autowired
	private ServiceTicket service;
//	{
//	    "issue": "Laptop not working",
//	    "description": "Screen goes blank randomly"
//	}
    @PostMapping("/clientregister")
    public ResponseEntity<?> clientregister(@RequestBody  ClientDTO clientrequest) {
        return service.clientregister(clientrequest);
    }
    
    
    @PostMapping("/clientlogin")
    public ResponseEntity<?> login(@RequestBody ClientDTO clientrequest, HttpSession session) {

     return service.clientlogin(clientrequest, session);
    }
    
 // in service
    public ResponseEntity<?> technicianlogin(String password) {
        if (password.equals("tech123")) {
            return ResponseEntity.ok("Technician login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
    }
    
    
//    client apis-------------------------------------
    @PostMapping("/RaiseTicket")    //raiseticket button
    public ResponseEntity<?> raiseticket(@RequestBody BeforeTicketT beforeticket, HttpSession session){
    	return service.raiseTicket(beforeticket,session);
    }
    
  
    
    @GetMapping("/viewstatusClient")    //viewstatus button 
    public ResponseEntity<?> clientViewStatus( HttpSession session){
    	return service.clientViewStatus(session);
    }
//    admin apis-------------
    
    @GetMapping("/getAllPendingIssuesAdmin")
    public ResponseEntity<?> pendingIssuesAdmin(){
    	return service.pendingIssuesAdmin();
    }
    
    @PostMapping("/assigneIssuestoTechnician")  //assign button when admin clicks issue
    public ResponseEntity<?> issuedToTechnician(@RequestBody BeforeTicketT beforeticket){
    	return service.issuedToTechnician(beforeticket);
    }
    
    
    @GetMapping("/adminViewStatus")
    public ResponseEntity<?> adminView(){
    	return service.adminView();
    	
    }
    
//    @PostMapping("/reportToClient")
//    public ResponseEntity<?> reportToClient(@RequestBody AfterTicketT afterticket){
//    	return service.reportToClient(afterticket);
//    	
//    }
    
//    technician apis-----
    
    @GetMapping("/pendingIssuesTechnician")
    public ResponseEntity<?> pendingIssues(){
    	return service.pendingIssues();
    	
    }
    
    
    @PostMapping("/reportToAdmin")
    public ResponseEntity<?> reportToAdmin(@RequestBody AfterTicketT afterticket){
    	return service.reportToAdmin(afterticket);
    	
    }
    

}
