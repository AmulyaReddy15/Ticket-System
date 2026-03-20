package com.example.Ticket.Raising.Backendd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;


public interface BeforeRepo extends JpaRepository<BeforeTicketT, Integer>{

	Optional<BeforeTicketT> findById(Integer issueId);

	List<BeforeTicketT> findByassignedAndTechid(boolean assigned,int techid);

}
