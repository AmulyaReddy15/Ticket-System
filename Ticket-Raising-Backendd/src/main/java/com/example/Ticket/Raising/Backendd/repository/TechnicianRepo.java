package com.example.Ticket.Raising.Backendd.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Ticket.Raising.Backendd.model.TechnicianT;

public interface TechnicianRepo extends JpaRepository<TechnicianT, Integer>{
	List<TechnicianT> findByDomain(String domain);

	Optional<TechnicianT> findByEmail(String email);
}
