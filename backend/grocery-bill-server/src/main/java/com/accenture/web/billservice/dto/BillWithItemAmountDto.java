package com.accenture.web.billservice.dto;

import com.accenture.web.billservice.domain.DiscountedBill;
import com.accenture.web.billservice.domain.GroceryBill;
import com.accenture.web.billservice.domain.Item;
import com.accenture.web.billservice.domain.ShoppingClerk;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class BillWithItemAmountDto {
    private final int id;
    private final String billId;
    private final ShoppingClerk clerk;
    private final LocalDateTime dateCreated;
    private final String type;
    private final double totalBill;
    private final double payment;
    private final double change;
    private final Map<String, Integer> itemNameWithAmount;

    public BillWithItemAmountDto(GroceryBill bill){
        this.id = bill.getId();
        this.billId = bill.getBillId();
        this.clerk = bill.getShoppingClerk();
        this.dateCreated = bill.getDateCreated();
        this.type = bill.getClass().equals(DiscountedBill.class) ? "discounted" : "regular";
        this.totalBill = bill.getTotalBill();
        this.payment = bill.getPayment();
        this.change = bill.getChange();
        this.itemNameWithAmount = new HashMap<>();
        for (Item item: bill.getItemList()) {
            if(itemNameWithAmount.isEmpty() || !itemNameWithAmount.containsKey(item.getName())) {
                itemNameWithAmount.put(item.getName(), 1);
            }else {
                itemNameWithAmount.put(item.getName(), itemNameWithAmount.get(item.getName()) + 1);
            }
        }
    }

    public int getId() {
        return id;
    }

    public String getBillId() {return billId;}

    public ShoppingClerk getClerk() {
        return clerk;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public String getType() {
        return type;
    }

    public double getTotalBill() {
        return totalBill;
    }

    public Map<String, Integer> getItemNameWithAmount() {
        return itemNameWithAmount;
    }

    public double getPayment() {
        return payment;
    }

    public double getChange() {
        return change;
    }
}
