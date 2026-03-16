package com.example.Ticket.Raising.Backendd.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

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
public class BeforeTicketT {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer issueid;
	@CreationTimestamp
	private LocalDateTime issueDate;
	private String issue;
	private String description;
	private boolean assigned = false; //  default 
	

}
