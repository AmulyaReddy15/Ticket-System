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
	private Integer beforeTicketId;  // ✅ this links both tables
	private String issue;
	private Date issudedate;
	private String description;
	private String status;
	private String solution;

}
