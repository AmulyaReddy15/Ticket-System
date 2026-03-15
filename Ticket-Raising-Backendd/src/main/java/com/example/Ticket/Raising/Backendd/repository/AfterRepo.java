package com.example.Ticket.Raising.Backendd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Ticket.Raising.Backendd.model.AfterTicketT;



public interface AfterRepo extends JpaRepository<AfterTicketT, Integer> {

}
