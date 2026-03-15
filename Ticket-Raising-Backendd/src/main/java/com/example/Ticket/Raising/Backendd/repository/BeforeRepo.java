package com.example.Ticket.Raising.Backendd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Ticket.Raising.Backendd.model.BeforeTicketT;


public interface BeforeRepo extends JpaRepository<BeforeTicketT, Integer>{

}
