package com.accenture.web.domain;

import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Item {
 
	@Id
	private int id;

	@NotEmpty(message = "Name must not be empty")
	private String name;

	@Digits(fraction = 2, integer = 9, message = "Price can't exceed 999,999,999.99")
	private double price; 

	@NotNull(message = "isDiscounted must be defined")
	private boolean discounted;

	@NotNull(message = "Discount percentage must be defined")
	@Digits(fraction = 2, integer = 0, message = "Discount must be between 1 and 0")
	private double discountPercentage;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH,
			CascadeType.DETACH })
	@JoinTable(name = "groceryBill_item", joinColumns = @JoinColumn(name = "item_name"), inverseJoinColumns = @JoinColumn(name = "bill_id"))
	@JsonIgnore
	private List<GroceryBill> groceryBill;

	public Item() {
		super();
	}

	public Item(String name, double price, boolean discounted, double discountPercentage) {
		super();
		this.name = name;
		this.price = price;
		this.discounted = discounted;
		this.discountPercentage = discountPercentage;
	}

	public Item(int id, String name, double price, boolean discounted, double discountPercentage) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.discounted = discounted;
		this.discountPercentage = discountPercentage;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public double getPrice() {
		return price;
	}

	public boolean isDiscounted() {
		return discounted;
	}

	public double getDiscountPercentage() {
		return discountPercentage;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public void setDiscounted(boolean isDiscounted) {
		this.discounted = isDiscounted;
	}

	public void setDiscountPercentage(double discountPercentage) {
		this.discountPercentage = discountPercentage;
	}

	public List<GroceryBill> getGroceryBill() {
		return groceryBill;
	}

	public void setGroceryBill(List<GroceryBill> groceryBill) {
		this.groceryBill = groceryBill;
	}

	@Override
	public int hashCode() {
		return Objects.hash(discountPercentage, discounted, id, name, price);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Item other = (Item) obj;
		return Double.doubleToLongBits(discountPercentage) == Double.doubleToLongBits(other.discountPercentage)
				&& discounted == other.discounted && id == other.id && Objects.equals(name, other.name)
				&& Double.doubleToLongBits(price) == Double.doubleToLongBits(other.price);
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", price=" + price + ", discounted=" + discounted
				+ ", discountPercentage=" + discountPercentage + "]";
	}

}
