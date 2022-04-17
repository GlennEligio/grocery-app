package com.accenture.web.billservice.service;

import com.accenture.web.billservice.domain.GroceryBill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroceryBillService {

    List<GroceryBill> getAllGroceryBills();

    Page<GroceryBill> findBillsWithPagingAndSorting(Pageable pageable);

    Page<GroceryBill> findBillsWithIdPagingAndSorting(String id, Pageable pageable);

    Page<GroceryBill> findBillsWithShoppingClerkUsernamePagingAndSorting(String username, Pageable pageable);

    int addOrUpdateBills(List<GroceryBill> bills, boolean overwrite);

    GroceryBill getGroceryBill(Integer id);

    GroceryBill addGroceryBill(GroceryBill groceryBill);

    GroceryBill updateGroceryBill(GroceryBill groceryBill);

    boolean deleteGroceryBill(Integer id);
}
