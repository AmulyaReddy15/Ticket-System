package com.example.Ticket.Raising.Backendd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Ticket.Raising.Backendd.model.AfterTicketT;



public interface AfterRepo extends JpaRepository<AfterTicketT, Integer> {

	List<AfterTicketT> findByStatusInAndTechid(List<String> statuses,int techid); 
	List<AfterTicketT> findByClientidAndClientView(Integer id, boolean clientView);
}
