package com.accenture.web.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value = "discounted_bill")
public class DiscountedBill extends GroceryBill{

	private static final long serialVersionUID = 1L;

	public DiscountedBill(ShoppingClerk clerk) {
		super(clerk);
	}

	public DiscountedBill() {
		
	}
	
	@Override
	public double getTotalBill() {
		totalBill = 0;
		if(itemList != null) {
			for (Item item : itemList) {
				if(item.isDiscounted()) {
					totalBill += item.getPrice() * (1 - item.getDiscountPercentage());	
				}else {
					totalBill += item.getPrice();
				}
			}
			return totalBill;
		}
		return 0;
	}

	@Override
	public String toString() {
		return "DiscountedBill [itemList=" + itemList + ", totalBill=" + totalBill + "]";
	}
}
