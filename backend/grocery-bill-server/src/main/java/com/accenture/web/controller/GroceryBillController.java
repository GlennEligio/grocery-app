package com.accenture.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.domain.GroceryBill;
import com.accenture.web.service.GroceryBillServiceImpl;

@RestController
public class GroceryBillController {

	@Autowired
	private GroceryBillServiceImpl service;
	
	private static final Logger log = LoggerFactory.getLogger(GroceryBillController.class);

	@PostMapping("/groceryBills")
	public ResponseEntity<? extends GroceryBill> createNewGroceryBill(@Valid @RequestBody GroceryBill groceryBill) {
		log.info("Creating Grocery Bill " + groceryBill);
		if(groceryBill != null) {
			// To set the value of totalBill
			groceryBill.getTotalBill();
			log.info("Total bill: " + groceryBill.getTotalBill());
			GroceryBill billDb = service.addGroceryBill(groceryBill);
			log.info("billDb: {}", billDb);
			if(billDb != null) {
				log.info("Grocery bill added: " + billDb);
				return new ResponseEntity<>(billDb, HttpStatus.CREATED);
			}
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/groceryBills")
	public ResponseEntity<List<GroceryBill>> getAllGroceryBills() {
		log.info("Fetching all grocery bills");
		List<GroceryBill> groceryBills = service.getAllGroceryBills();
		if (groceryBills != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(service.getAllGroceryBills());
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/groceryBills/{id}")
	public ResponseEntity<GroceryBill> getGroceryBill(@PathVariable("id") Integer id) {
		log.info("Fetching grocery bill with id: " + id);
		GroceryBill groceryBill = service.getGroceryBill(id);
		if (groceryBill != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(groceryBill);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/groceryBills/{id}")
	public ResponseEntity<?> deleteGroceryBill(@PathVariable("id") Integer id) {
		log.info("Deleting grocery bill with id: " + id);
		boolean success = service.deleteGroceryBill(id);
		if (success) {
			log.info("Delete success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/groceryBills")
	public ResponseEntity<?> updateGroceryBill(@Valid @RequestBody GroceryBill groceryBill) {
		log.info("Updating grocery bill: " + groceryBill);
		GroceryBill updatedBill = service.updateGroceryBill(groceryBill);
		if (updatedBill != null) {
			log.info("Update success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
