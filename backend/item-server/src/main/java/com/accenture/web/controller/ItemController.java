package com.accenture.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

	@GetMapping(value = "/items", params = {"page", "size"})
	public ResponseEntity<Page<Item>> getItemWithPaging(@RequestParam("page") int page,
														@RequestParam("size") int size){
		log.info("Fetching items with page "+page+" and size of "+size);
		return ResponseEntity.ok(service.findItemsWithPaging(PageRequest.of(page-1, size)));
	}

	@GetMapping(value = "/items", params = {"page", "size", "field", "sort"})
	public ResponseEntity<Page<Item>> getItemWithPaging(@RequestParam("page") int page,
														@RequestParam("size") int size,
														@RequestParam("field") String field,
														@RequestParam("sort") String direction){
		log.info("Fetching items with page of " + page + " and size of " + size + ", sorted by " + field + " in " + direction + " order");
		return ResponseEntity.ok(service.findItemsWithPagingAndSorting(PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)));
	}

	@GetMapping(value = "/items", params={"name_query", "page", "size", "field", "sort"})
	public ResponseEntity<Page<Item>> getItemWithNameQueryPagingAndSorting(@RequestParam("name_query") String nameQuery,
																	   @RequestParam("page") int page,
																	   @RequestParam("size") int size,
																	   @RequestParam("field") String field,
																	   @RequestParam("sort") String direction){
		log.info("Fetching items with page with name containing" + nameQuery + "of " + page + " and size of " + size + ", sorted by " + field + " in " + direction + " order");

		Pageable pageable = PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field);
		return ResponseEntity.ok(service.findByNameWithPagingAndSorting(nameQuery, pageable));
	}

	@GetMapping(value = "/items", params={"id_query", "page", "size", "field", "sort"})
	public ResponseEntity<Page<Item>> getItemWithIdQueryPagingAndSorting(@RequestParam("id_query") String idQuery,
																		   @RequestParam("page") int page,
																		   @RequestParam("size") int size,
																		   @RequestParam("field") String field,
																		   @RequestParam("sort") String direction){
		log.info("Fetching items with page with id containing " + idQuery + " of page " + page + " and size of " + size + ", sorted by " + field + " in " + direction + " order");

		Pageable pageable = PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field);
		return ResponseEntity.ok(service.findByIdWithPagingAndSorting(idQuery, pageable));
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
