package com.accenture.web.domain;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotEmpty(message = "Name must not be empty")
	private String name;

	@Min(message = "Price must be defined", value = 0)
	private double price;

	@NotNull(message = "isDiscounted must be defined")
	private boolean discounted; 

	@NotNull(message = "Discount percentage must be defined")
	@Digits(fraction = 2, integer = 0, message = "Discount must be between 1 and 0")
	private double discountPercentage;

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
