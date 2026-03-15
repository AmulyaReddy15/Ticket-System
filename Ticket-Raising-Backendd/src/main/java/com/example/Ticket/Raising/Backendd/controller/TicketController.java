package com.example.Ticket.Raising.Backendd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ticket.Raising.Backendd.dto.ClientDTO;
import com.example.Ticket.Raising.Backendd.dto.TechnicianDTO;
import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.service.ServiceTicket;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
public class TicketController {
	
	@Autowired
	private ServiceTicket service;
	
    @PostMapping("/clientregister")
    public ResponseEntity<?> clientregister(@RequestBody  ClientDTO clientrequest) {
        return service.clientregister(clientrequest);
    }
    @PostMapping("/technicianregister")
    public ResponseEntity<?> techregister(@RequestBody  TechnicianDTO techrequest) {
        return service.techregister(techrequest);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ClientDTO clientrequest, HttpSession session) {

     return service.clientlogin(clientrequest, session);
    }
    
    @PostMapping("/RaiseTicket")
    public ResponseEntity<?> raiseticket(@RequestBody BeforeTicketT beforeticket){
    	return service.raiseTicket(beforeticket);
    }
    
    @GetMapping("/adminViewStatus")
    public ResponseEntity<?> adminView(AfterTicketT afterticket){
    	return service.adminView(afterticket);
    	
    }
    

}
