package com.example.Ticket.Raising.Backendd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ticket.Raising.Backendd.dto.ClientDTO;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;
import com.example.Ticket.Raising.Backendd.service.ServiceClient;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
public class ClientController {
	
	@Autowired
	private ServiceClient service;
	
//	cleint credentials apis=============================
    @PostMapping("/clientregister")
    public ResponseEntity<?> clientregister(@RequestBody  ClientDTO clientrequest) {
        return service.clientregister(clientrequest);
    }
    
    @PostMapping("/clientlogin")
    public ResponseEntity<?> cleintlogin(@RequestBody ClientDTO clientrequest, HttpSession session) {

     return service.clientlogin(clientrequest, session);
    }
    
    @PostMapping("/clientlogout")
    public ResponseEntity<?> clientlogout( HttpSession session) {

        return service.cleintlogout(session);
       }
//  client apis-------------------------------------
  @PostMapping("/RaiseTicket")    //raiseticket button
  public ResponseEntity<?> raiseticket(@RequestBody BeforeTicketT beforeticket, HttpSession session){
  	return service.raiseTicket(beforeticket,session);
  }
  

  
  @GetMapping("/viewstatusClient")    //viewstatus button 
  public ResponseEntity<?> clientViewStatus( HttpSession session){
  	return service.clientViewStatus(session);
  }
}
