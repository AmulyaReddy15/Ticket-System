package com.example.Ticket.Raising.Backendd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;


public interface BeforeRepo extends JpaRepository<BeforeTicketT, Integer>{

	Optional<BeforeTicketT> findById(Integer issueId);

	List<BeforeTicketT> findByassignedAndTechid(boolean assigned,int techid);

    @Query("SELECT b FROM BeforeTicketT b WHERE b.clientid = :id")
    List<BeforeTicketT> findByClientid(Integer id);

}
