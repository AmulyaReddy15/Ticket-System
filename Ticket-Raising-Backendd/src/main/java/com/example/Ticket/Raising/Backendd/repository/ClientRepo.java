package com.example.Ticket.Raising.Backendd.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Ticket.Raising.Backendd.model.ClientT;



public interface ClientRepo extends JpaRepository<ClientT, Integer>{

	Optional<ClientT> findByEmail(String email);

}
