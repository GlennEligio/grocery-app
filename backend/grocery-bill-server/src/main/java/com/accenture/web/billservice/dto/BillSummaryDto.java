package com.accenture.web.billservice.dto;

import com.accenture.web.billservice.domain.ShoppingClerk;
import com.accenture.web.billservice.domain.DiscountedBill;
import com.accenture.web.billservice.domain.GroceryBill;

import java.time.format.DateTimeFormatter;

public class BillSummaryDto {

    private int id;
    private String billId;
    private int itemCount;
    private ShoppingClerk shoppingClerk;
    private String type;
    private double totalBill;
    private double payment;
    private double change;
    private String dateCreated;

    public BillSummaryDto() {
    }

    public BillSummaryDto(GroceryBill bill) {
        this.type = bill.getClass().equals(DiscountedBill.class) ? "Discounted" : "Regular";
        this.billId = bill.getBillId();
        this.id = bill.getId();
        this.itemCount = bill.getItemList().size();
        this.shoppingClerk = bill.getShoppingClerk();
        this.dateCreated = bill.getDateCreated().format(DateTimeFormatter.ofPattern("MM-dd-yyyy hh:mm a"));
        this.totalBill = bill.getTotalBill();
        this.payment  =bill.getPayment();
        this.change = bill.getChange();
    }

    public int getId() {
        return id;
    }

    public int getItemCount() {
        return itemCount;
    }

    public ShoppingClerk getShoppingClerk() {
        return shoppingClerk;
    }

    public String getType() {
        return type;
    }

    public double getTotalBill() {
        return totalBill;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public String getBillId() {
        return billId;
    }

    public double getPayment() {
        return payment;
    }

    public double getChange() {
        return change;
    }

}
