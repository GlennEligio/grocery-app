package com.accenture.web.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import com.accenture.web.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
	
	@Query("SELECT u FROM User u WHERE u.username=:username")
	User findByUsername(String username);

	Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
	Page<User> findByNameContainingIgnoreCase(String username, Pageable pageable);
	@Query("SELECT u FROM User u WHERE CAST(u.id as string) LIKE concat('%', :id, '%')")
	Page<User> findByIdQuery(String id, Pageable pageable);

}
