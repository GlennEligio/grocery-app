package com.accenture.web.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "regular_bill")
public class RegularBill extends GroceryBill {

	private static final long serialVersionUID = 1L;

	public RegularBill() {

	}

	public RegularBill(ShoppingClerk clerk) {
		super(clerk);
	}

	@Override
	public double getTotalBill() {
		totalBill = 0;
		for (Item item : itemList) {
			totalBill += item.getPrice();
		}
		return totalBill;
	}

	@Override
	public String toString() {
		return super.toString();
	}

}