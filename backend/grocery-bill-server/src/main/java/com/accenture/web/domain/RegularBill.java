package com.accenture.web.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@DiscriminatorValue(value = "regular_bill")
public class RegularBill extends GroceryBill {

	private static final long serialVersionUID = 1L;

	public RegularBill() {

	}

	public RegularBill(ShoppingClerk clerk) {
		super(clerk);
	}

	public RegularBill(ShoppingClerk shoppingClerk, List<Item> itemList, LocalDateTime dateCreated) {
		super(shoppingClerk, itemList, dateCreated);
	}

	@Override
	public double getTotalBill() {
		totalBill = 0;
		if(itemList != null){
			for (Item item : itemList) {
				totalBill += item.getPrice();
			}
			return totalBill;
		}
		return totalBill;
	}

	@Override
	public double getChange() {
		change = 0;
		if(totalBill > 0 && payment > 0 && payment > totalBill){
			change = payment - totalBill;
		}
		return change;
	}

	@Override
	public String toString() {
		return super.toString();
	}

}
