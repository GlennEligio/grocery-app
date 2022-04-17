package com.accenture.web.itemservice.domain;

import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotEmpty(message = "Name must not be empty")
	@Column(unique = true)
	private String name;

	@Min(message = "Price must be defined", value = 0)
	private double price;

	@NotNull(message = "isDiscounted must be defined")
	private boolean discounted; 

	@NotNull(message = "Discount percentage must be defined")
	@Digits(fraction = 2, integer = 0, message = "Discount must be between 1 and 0")
	private double discountPercentage;

	private boolean deleteFlag;

	public Item() {
		super();
		this.deleteFlag = false;
	}

	public Item(String name, double price, boolean discounted, double discountPercentage) {
		this.name = name;
		this.price = price;
		this.discounted = discounted;
		this.discountPercentage = discountPercentage;
		this.deleteFlag = false;
	}

	public Item(Integer id, String name, double price, boolean discounted, double discountPercentage) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.discounted = discounted;
		this.discountPercentage = discountPercentage;
		this.deleteFlag = false;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id){
		this.id = id;
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

	public boolean isDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(boolean deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Item item = (Item) o;
		return Double.compare(item.price, price) == 0 && discounted == item.discounted && Double.compare(item.discountPercentage, discountPercentage) == 0 && deleteFlag == item.deleteFlag && Objects.equals(id, item.id) && Objects.equals(name, item.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, price, discounted, discountPercentage, deleteFlag);
	}

	@Override
	public String toString() {
		return "Item{" +
				"id=" + id +
				", name='" + name + '\'' +
				", price=" + price +
				", discounted=" + discounted +
				", discountPercentage=" + discountPercentage +
				", deleteFlag=" + deleteFlag +
				'}';
	}
}
