package com.example.Ticket.Raising.Backendd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.Ticket.Raising.Backendd.service.ServiceAdmin;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
public class AdminController {
	
	@Autowired
	private ServiceAdmin service;
	
//  admin login and logout apis===================================================================
  @PostMapping("/adminlogin")
  public ResponseEntity<?> adminLogin(@RequestParam String username, 
                                      @RequestParam String password, 
                                      HttpSession session) {
      return service.adminLogin(username, password, session);
  }

  @PostMapping("/adminlogout")
  public ResponseEntity<?> adminLogout(HttpSession session) {
      return service.adminLogout(session);
  }
  
//admin apis-------------
  
@GetMapping("/getAllPendingIssuesAdmin")
public ResponseEntity<?> pendingIssuesAdmin(HttpSession session){
	return service.pendingIssuesAdmin(session);
}

@PostMapping("/assigneIssuestoTechnician")  //assign button when admin clicks issue
public ResponseEntity<?> issuedToTechnician(@RequestParam Integer issueid,HttpSession session){
	return service.issuedToTechnician(issueid,session);
}


@GetMapping("/adminViewStatus")
public ResponseEntity<?> adminView(HttpSession session){
	return service.adminView(session);
	
}

@PostMapping("/reportToClient")
public ResponseEntity<?> reportToClient(@RequestParam Integer issueid,HttpSession session){
	return service.reportToClient(issueid,session);
	
}

}
