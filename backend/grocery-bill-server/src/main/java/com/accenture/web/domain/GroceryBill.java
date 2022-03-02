package com.accenture.web.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

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

	@Column(columnDefinition = "TIMESTAMP")
	protected LocalDateTime dateCreated;

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
		itemList.forEach(System.out::println);
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

	public LocalDateTime getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(LocalDateTime dateCreated) {
		this.dateCreated = dateCreated;
	}

	@Override
	public String toString() {
		return "GroceryBill [id=" + id + ", itemList=" + itemList + ", shoppingClerk=" + shoppingClerk + "]";
	}

}
