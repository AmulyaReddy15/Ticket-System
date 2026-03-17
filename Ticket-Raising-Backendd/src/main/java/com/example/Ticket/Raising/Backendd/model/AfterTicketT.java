package com.example.Ticket.Raising.Backendd.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                    
@NoArgsConstructor      
@AllArgsConstructor     // through lambok
@Entity
public class AfterTicketT {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer issueid;
	private Integer clientid;
	private Integer beforeTicketId;  // ✅ this links both tables,
//	like when technician clicks the issue it will get issue details prefilled from beforeticket then this info is used to save in afterticket table  
	private String issue;
	private Date issudedate;
	private String description;
	private String status;
	private String solution;

}
