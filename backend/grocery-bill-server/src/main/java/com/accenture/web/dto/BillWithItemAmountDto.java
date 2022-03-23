package com.accenture.web.dto;

import com.accenture.web.domain.DiscountedBill;
import com.accenture.web.domain.GroceryBill;
import com.accenture.web.domain.Item;
import com.accenture.web.domain.ShoppingClerk;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class BillWithItemAmountDto {
    private final int id;
    private final ShoppingClerk clerk;
    private final LocalDateTime dateCreated;
    private final String type;
    private final double totalBill;
    private final Map<Integer, Integer> itemIdWithAmount;

    public BillWithItemAmountDto(GroceryBill bill){
        this.id = bill.getId();
        this.clerk = bill.getShoppingClerk();
        this.dateCreated = bill.getDateCreated();
        this.type = bill.getClass().equals(DiscountedBill.class) ? "discounted" : "regular";
        this.totalBill = bill.getTotalBill();
        this.itemIdWithAmount = new HashMap<>();
        for (Item item: bill.getItemList()) {
            if(itemIdWithAmount.isEmpty() || !itemIdWithAmount.containsKey(item.getId())) {
                itemIdWithAmount.put(item.getId(), 1);
            }else {
                itemIdWithAmount.put(item.getId(), itemIdWithAmount.get(item.getId()) + 1);
            }
        }
    }

    public int getId() {
        return id;
    }

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

    public Map<Integer, Integer> getItemIdWithAmount() {
        return itemIdWithAmount;
    }
}
