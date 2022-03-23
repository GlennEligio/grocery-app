package com.accenture.web.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.accenture.web.domain.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT u FROM User u WHERE u.username=:username")
	User findByUsername(String username);

	@Query("SELECT u " +
			"FROM User u " +
			"WHERE u.username LIKE concat('%', :username, '%') " +
			"AND u.roles NOT LIKE 'ROLE_SADMIN'")
	Page<User> findByUsername(String username, Pageable pageable);
	@Query("SELECT u " +
			"FROM User u " +
			"WHERE u.name LIKE concat('%', :name, '%') " +
			"AND u.roles NOT LIKE 'ROLE_SADMIN'")
	Page<User> findByName(String name, Pageable pageable);
	@Query("SELECT u FROM User u WHERE CAST(u.id as string) LIKE concat('%', :id, '%') " +
			"AND u.roles NOT LIKE 'ROLE_SADMIN'")
	Page<User> findByIdQuery(String id, Pageable pageable);

}
