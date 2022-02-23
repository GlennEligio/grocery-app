package com.accenture.web.service;

import com.accenture.web.domain.GroceryBill;

import java.util.List;

public interface GroceryBillService {

    List<GroceryBill> getAllGroceryBills();

    GroceryBill getGroceryBill(Integer id);

    GroceryBill addGroceryBill(GroceryBill groceryBill);

    GroceryBill updateGroceryBill(GroceryBill groceryBill);

    boolean deleteGroceryBill(Integer id);
}
