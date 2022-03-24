package com.accenture.web.repository;

import org.springframework.data.domain.Page;

import com.accenture.web.domain.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends PagingAndSortingRepository<Item, Integer> {

    @Query( value = "SELECT i FROM Item i WHERE i.name LIKE concat('%', :name, '%') AND i.deleteFlag=false")
    Page<Item> findByNameQuery(@Param("name") String name, Pageable pageable);

    @Query( value = "SELECT i FROM Item i WHERE cast(i.id as string) LIKE concat('%', :id, '%') AND i.deleteFlag=false")
    Page<Item> findByIdQuery(@Param("id") String itemId, Pageable pageable);

    List<Item> findByNameContainingIgnoreCase(String name);

    @Query( "SELECT i FROM Item i WHERE i.deleteFlag=false")
    List<Item> findAllNotDeleted();

    //Soft delete.
    @Query("update #{#entityName} e set e.deleteFlag=true where e.id=?1")
    @Modifying
    void softDelete(String id);
}
