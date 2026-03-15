package com.example.Ticket.Raising.Backendd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Ticket.Raising.Backendd.model.ClientT;
import com.example.Ticket.Raising.Backendd.model.TechnicianT;

public interface TechnicianRepo extends JpaRepository<TechnicianT, Integer>{

}
