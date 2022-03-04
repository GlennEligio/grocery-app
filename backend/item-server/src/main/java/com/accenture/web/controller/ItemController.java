package com.accenture.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accenture.web.domain.Item;
import com.accenture.web.service.ItemServiceImpl;

@RestController
@RequestMapping("/api/v1")
public class ItemController {
	
	@Autowired
	private ItemServiceImpl service;
	
	private static final Logger log = LoggerFactory.getLogger(ItemController.class);
	
	@GetMapping("/items")
	public ResponseEntity<List<Item>> getAllItems(){
		log.info("Fetching items");
		List<Item> items = service.getAllItems();
		if(items != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(service.getAllItems());
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/items/{id}")
	public ResponseEntity<Item> getItem(@PathVariable("id") Integer id){
		log.info("Fetching item with id: " + id);
		Item item = service.getItem(id);
		if(item != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(item);
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping(value = "/items", consumes = "application/json")
	public ResponseEntity<Item> createItem(@Valid @RequestBody Item item){
		log.info("Adding " + item);
		Item itemDb = service.addItem(item);
		
		if(itemDb != null) { 
			log.info("Add success");
			return new ResponseEntity<>(itemDb, HttpStatus.CREATED);
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/items/{id}")
	public ResponseEntity<?> deleteItem(@PathVariable("id") Integer id){
		log.info("Deleting item with id: " + id);
		boolean success = service.deleteItem(id);
		if(success) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping(value="/items", consumes = "application/json")
	public ResponseEntity<?> updateItem(@Valid @RequestBody Item item){
		log.info("Updating item with " + item);
		Item itemUpdated = service.updateItem(item);
		if(itemUpdated != null) {
			log.info("Update success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
