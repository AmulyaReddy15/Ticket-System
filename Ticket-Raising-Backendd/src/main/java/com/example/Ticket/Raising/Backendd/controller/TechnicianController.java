package com.example.Ticket.Raising.Backendd.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Ticket.Raising.Backendd.dto.TechnicianDTO;
import com.example.Ticket.Raising.Backendd.model.AfterTicketT;
import com.example.Ticket.Raising.Backendd.service.ServiceTechnician;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
public class TechnicianController {
	
	@Autowired
	private ServiceTechnician service;

 // technician credentials apis===============================
    @PostMapping("/techncicianRegister")
    public ResponseEntity<?> techregister(@RequestBody  TechnicianDTO techrequest) {
        return service.technicianRegister(techrequest);
    }
    
    @PostMapping("/techncicianlogin")
    public ResponseEntity<?> techlogin(@RequestBody TechnicianDTO techrequest, HttpSession session) {

     return service.techncicianLogin(techrequest, session);
    }
    
    @PostMapping("/techncicianlogout")
    public ResponseEntity<?> techlogout( HttpSession session) {

        return service.techncicianLogout(session);
       }
   
    
//    technician apis-----
    
    @GetMapping("/pendingIssuesTechnician")
    public ResponseEntity<?> pendingIssues(HttpSession session){
    	return service.pendingIssues(session);
    	
    }
    
    
    @PostMapping("/reportToAdmin")
    public ResponseEntity<?> reportToAdmin(@RequestBody AfterTicketT afterticket,HttpSession session){
    	return service.reportToAdmin(afterticket,session);
    	
    }
    

}
