package com.accenture.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.accenture.web.dto.BillSummaryDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accenture.web.domain.GroceryBill;
import com.accenture.web.service.GroceryBillServiceImpl;

@RestController
@RequestMapping("/api/v1")
public class GroceryBillController {

	@Autowired
	private GroceryBillServiceImpl service;
	
	private static final Logger log = LoggerFactory.getLogger(GroceryBillController.class);

	@PostMapping("/bills")
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

	@GetMapping("/bills")
	public ResponseEntity<List<GroceryBill>> getAllGroceryBills() {
		log.info("Fetching all grocery bills");
		List<GroceryBill> groceryBills = service.getAllGroceryBills();
		if (groceryBills != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(service.getAllGroceryBills());
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping(value = "/bills", params = {"page", "size"})
	public ResponseEntity<Page<BillSummaryDto>> getBillsWithPaging(@RequestParam("page") int page,
																@RequestParam("size") int size){
		log.info("Fetching grocery bills in page " + page + " of size " + size);
		Page<GroceryBill> billPage = service.findBillsWithPaging(PageRequest.of(page-1, size));
		Page<BillSummaryDto> billSummaryPage = billPage.map(BillSummaryDto::new);
		return ResponseEntity.ok(billSummaryPage);
	}

	@GetMapping(value = "/bills", params = {"page", "size", "field", "sort"})
	public ResponseEntity<Page<BillSummaryDto>> getBillsWithPagingAndSorting(@RequestParam("page") int page,
																   @RequestParam("size") int size,
																   @RequestParam("field") String field,
																   @RequestParam("sort") String direction){
		log.info("Fetching grocery bills in page " + page + " of size " + size + ", sorted by " + field + " in " + direction + " order");
		Page<BillSummaryDto> billPage = service.findBillsWithPagingAndSorting(PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)).map(BillSummaryDto::new);
		return ResponseEntity.ok(billPage);
	}

	@GetMapping(value = "/bills", params = {"id_query", "page", "size", "field", "sort"})
	public ResponseEntity<Page<BillSummaryDto>> getBillsWithIdQueryPagingAndSorting(@RequestParam("id_query") String idQuery,
																					@RequestParam("page") int page,
																					@RequestParam("size") int size,
																					@RequestParam("field") String field,
																					@RequestParam("sort") String direction){
		log.info("Fetching bills with id " + idQuery + " in page " + page + " of size " + size + ", sorted by " + field + " in " + direction + "order");
		Page<BillSummaryDto> billSummaryPage = service.findBillsWithIdPagingAndSorting(idQuery, PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)).map(BillSummaryDto::new);
		return ResponseEntity.ok(billSummaryPage);
	}

	@GetMapping(value = "/bills", params = {"username_query", "page", "size", "field", "sort"})
	public ResponseEntity<Page<BillSummaryDto>> getBillsWithUsernameQueryPagingAndSorting(@RequestParam("username_query") String usernameQuery,
																					@RequestParam("page") int page,
																					@RequestParam("size") int size,
																					@RequestParam("field") String field,
																					@RequestParam("sort") String direction){
		log.info("Fetching bills with username " + usernameQuery + " in page " + page + " of size " + size + ", sorted by " + field + " in " + direction + "order");
		Page<BillSummaryDto> billSummaryPage = service.findBillsWithShoppingClerkUsernamePagingAndSorting(usernameQuery, PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)).map(BillSummaryDto::new);
		return ResponseEntity.ok(billSummaryPage);
	}

	@GetMapping("/bills/summary")
	public ResponseEntity<List<BillSummaryDto>> getAllBillSummary() {
		log.info("Fetching all grocery bills summary");
		List<GroceryBill> groceryBills = service.getAllGroceryBills();
		if (groceryBills != null) {
			log.info("Fetch success");
			List<BillSummaryDto> billSummaryDtoList = groceryBills.stream().map(BillSummaryDto::new).collect(Collectors.toList());
			return ResponseEntity.ok(billSummaryDtoList);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/bills/{id}")
	public ResponseEntity<GroceryBill> getGroceryBill(@PathVariable("id") Integer id) {
		log.info("Fetching grocery bill with id: " + id);
		GroceryBill groceryBill = service.getGroceryBill(id);
		if (groceryBill != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(groceryBill);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/bills/{id}")
	public ResponseEntity<?> deleteGroceryBill(@PathVariable("id") Integer id) {
		log.info("Deleting grocery bill with id: " + id);
		boolean success = service.deleteGroceryBill(id);
		if (success) {
			log.info("Delete success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/bills")
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
