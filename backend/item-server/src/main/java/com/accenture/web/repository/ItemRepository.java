package com.accenture.web.repository;

import org.springframework.data.domain.Page;

import com.accenture.web.domain.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends PagingAndSortingRepository<Item, Integer> {

    Page<Item> findByNameContainingIgnoreCase(String name, Pageable pageable);
    @Query( value = "SELECT i FROM Item i WHERE cast(i.id as string) LIKE concat('%', :id, '%')")
    Page<Item> findByIdContaining(@Param("id") String itemId, Pageable pageable);
}
