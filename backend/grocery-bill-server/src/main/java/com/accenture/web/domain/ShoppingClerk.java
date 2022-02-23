package com.accenture.web.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ShoppingClerk {

	@Id
	private int id;

	@NotBlank(message = "Name must be defined")
	private String name;

	@OneToMany(mappedBy = "shoppingClerk", cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH,
			CascadeType.DETACH })
	@JsonIgnore
	private List<GroceryBill> groceryBill;

	public ShoppingClerk() {
		super();
	}

	public ShoppingClerk(String name) {
		super();
		this.name = name;
	}

	public ShoppingClerk(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<GroceryBill> getGroceryBill() {
		return groceryBill;
	}

	public void setGroceryBill(List<GroceryBill> groceryBill) {
		this.groceryBill = groceryBill;
	}

	@Override
	public String toString() {
		return "ShoppingClerk{" +
				"id=" + id +
				", name='" + name + '\'' +
				'}';
	}
}
