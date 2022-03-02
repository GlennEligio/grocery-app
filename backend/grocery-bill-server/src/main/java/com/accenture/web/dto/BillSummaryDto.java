package com.accenture.web.dto;

import com.accenture.web.domain.DiscountedBill;
import com.accenture.web.domain.GroceryBill;
import com.accenture.web.domain.ShoppingClerk;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class BillSummaryDto {

    private int id;
    private int itemCount;
    private ShoppingClerk shoppingClerk;
    private String type;
    private double totalBill;
    private String dateCreated;

    public BillSummaryDto() {
    }

    public BillSummaryDto(GroceryBill bill) {
        this.type = bill.getClass().equals(DiscountedBill.class) ? "Discounted" : "Regular";
        this.id = bill.getId();
        this.itemCount = bill.getItemList().size();
        this.shoppingClerk = bill.getShoppingClerk();
        this.dateCreated = bill.getDateCreated().format(DateTimeFormatter.ofPattern("MM-dd-yyyy hh:mm a"));
        this.totalBill = bill.getTotalBill();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public ShoppingClerk getShoppingClerk() {
        return shoppingClerk;
    }

    public void setShoppingClerk(ShoppingClerk shoppingClerk) {
        this.shoppingClerk = shoppingClerk;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(double totalBill) {
        this.totalBill = totalBill;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }
}
