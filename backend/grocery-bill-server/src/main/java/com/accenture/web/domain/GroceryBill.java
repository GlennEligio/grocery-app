package com.accenture.web.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "bill_type", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({ @JsonSubTypes.Type(value = DiscountedBill.class, name = "discounted"),
		@JsonSubTypes.Type(value = RegularBill.class, name = "regular") })
public abstract class GroceryBill implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH,
			CascadeType.DETACH })
	@JoinTable(name = "groceryBill_item", joinColumns = @JoinColumn(name = "bill_id"), inverseJoinColumns = @JoinColumn(name = "item_name"))
	protected List<Item> itemList;

	protected double totalBill;

	@ManyToOne(targetEntity = ShoppingClerk.class, cascade = { CascadeType.MERGE, CascadeType.REFRESH,
			CascadeType.PERSIST, CascadeType.DETACH })
	@JoinColumn(name = "shoppingClerk")
	private ShoppingClerk shoppingClerk;

	public GroceryBill() {

	}

	public GroceryBill(ShoppingClerk shoppingClerk) {
		super();
		this.shoppingClerk = shoppingClerk;
	}

	public void addItem(Item item) {
		if (item != null) {
			itemList.add(item);
		}
	}

	public void printReceipt() {
		itemList.forEach(item -> System.out.println(item));
	}

	public abstract double getTotalBill();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public List<Item> getItemList() {
		return itemList;
	}

	public void setItemList(List<Item> itemList) {
		this.itemList = itemList;
	}

	public ShoppingClerk getShoppingClerk() {
		return shoppingClerk;
	}

	public void setShoppingClerk(ShoppingClerk shoppingClerk) {
		this.shoppingClerk = shoppingClerk;
	}

	@Override
	public String toString() {
		return "GroceryBill [id=" + id + ", itemList=" + itemList + ", shoppingClerk=" + shoppingClerk + "]";
	}

}
