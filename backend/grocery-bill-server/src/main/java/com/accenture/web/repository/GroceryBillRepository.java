package com.accenture.web.repository;

import com.accenture.web.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.accenture.web.domain.GroceryBill;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroceryBillRepository extends PagingAndSortingRepository<GroceryBill, Integer> {

    @Query("SELECT gb FROM GroceryBill gb " +
            "LEFT JOIN gb.shoppingClerk sc " +
            "WHERE sc.username LIKE concat('%', :username, '%')")
    Page<GroceryBill> findByShoppingClerkUsername(@Param("username") String username, Pageable pageable);
    @Query( value = "SELECT gb FROM GroceryBill gb WHERE gb.billId LIKE concat('%', :billId, '%')")
    Page<GroceryBill> findByIdContaining(@Param("billId") String billId, Pageable pageable);

    @Query("SELECT gb FROM GroceryBill gb WHERE gb.billId LIKE :billId")
    List<GroceryBill> findByBillId(@Param("billId") String billId);
}
