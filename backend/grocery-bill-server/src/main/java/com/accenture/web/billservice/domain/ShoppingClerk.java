package com.accenture.web.billservice.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ShoppingClerk implements Serializable {

	@Id
	private int id;

	@NotBlank(message = "Name must be defined")
	@Column(name = "user_username")
	private String username;

	@OneToMany(mappedBy = "shoppingClerk", cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH,
			CascadeType.DETACH })
	@JsonIgnore
	private List<GroceryBill> groceryBill;

	public ShoppingClerk() {
		super();
	}

	public ShoppingClerk(String username) {
		super();
		this.username = username;
	}

	public ShoppingClerk(int id, String username) {
		this.id = id;
		this.username = username;
	}

	public int getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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
				", name='" + username + '\'' +
				'}';
	}
}
