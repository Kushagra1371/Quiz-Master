package com.kushagra.springsec.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kushagra.springsec.model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
}
