package com.accenture.web.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.accenture.web.client.ItemFeignClient;
import com.accenture.web.domain.DiscountedBill;
import com.accenture.web.domain.Item;
import com.accenture.web.domain.ShoppingClerk;
import com.accenture.web.dto.BillSummaryDto;
import com.accenture.web.exception.AppException;
import com.accenture.web.service.ExcelFileService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.accenture.web.domain.GroceryBill;
import com.accenture.web.service.GroceryBillServiceImpl;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class GroceryBillController {

	@Autowired
	private ItemFeignClient itemFeignClient;

	@Autowired
	private GroceryBillServiceImpl service;

	@Autowired
	private ExcelFileService excelFileService;
	
	private static final Logger log = LoggerFactory.getLogger(GroceryBillController.class);

	@GetMapping(value = "/bills", params = {"page", "size", "field", "sort"})
	public ResponseEntity<Page<BillSummaryDto>> getBillsWithPagingAndSorting(@RequestParam("page") int page,
																   @RequestParam("size") int size,
																   @RequestParam("field") String field,
																   @RequestParam("sort") String direction){
		log.info("Fetching grocery bills in page " + page + " of size " + size + ", sorted by " + field + " in " + direction + " order");
		Page<BillSummaryDto> billPage = service.findBillsWithPagingAndSorting(PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)).map(BillSummaryDto::new);
		return ResponseEntity.ok(billPage);
	}

	@GetMapping(value = "/bills", params = {"billId_query", "page", "size", "field", "sort"})
	public ResponseEntity<Page<BillSummaryDto>> getBillsWithIdQueryPagingAndSorting(@RequestParam("billId_query") String billIdQuery,
																					@RequestParam("page") int page,
																					@RequestParam("size") int size,
																					@RequestParam("field") String field,
																					@RequestParam("sort") String direction){
		log.info("Fetching bills with id " + billIdQuery + " in page " + page + " of size " + size + ", sorted by " + field + " in " + direction + "order");
		Page<BillSummaryDto> billSummaryPage = service.findBillsWithIdPagingAndSorting(billIdQuery, PageRequest.of(page-1, size, Sort.Direction.fromString(direction), field)).map(BillSummaryDto::new);
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
	
	@GetMapping("/bills/download")
	public void download(HttpServletResponse response) throws IOException {
		log.info("Downloading Grocery bill excel file");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=bills.xlsx");
		ByteArrayInputStream stream = excelFileService.billListToExcel(service.getAllGroceryBills());
		IOUtils.copy(stream, response.getOutputStream());
	}

	@GetMapping("/bills/download/template")
	public void downloadTemplate(HttpServletResponse response) throws IOException {
		log.info("Downloading Grocery bill excel file");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=bills-template.xlsx");
		// Dummy Bill list
		List<GroceryBill> billsDummy = new ArrayList<>();
		List<Item> itemsDummy = new ArrayList<>();
		Item item = new Item(0, "Dummy item1", 50, true, 0.50);
		Item item1 = new Item(1, "Dummy item2", 45, false, 0.45);
		itemsDummy.add(item);
		itemsDummy.add(item1);
		ShoppingClerk clerk = new ShoppingClerk(0, "Dummy Clerk");
		GroceryBill billDummy = new DiscountedBill(clerk, itemsDummy, LocalDateTime.now());
		billDummy.setPayment(420);
		billDummy.getTotalBill();
		billDummy.getChange();
		billDummy.setId(0);
		billsDummy.add(billDummy);

		ByteArrayInputStream stream = excelFileService.billListToExcel(billsDummy);
		IOUtils.copy(stream, response.getOutputStream());
	}

	@PostMapping("/bills/upload")
	public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile excelFile,
									@RequestParam("overwrite") Boolean overwrite,
									@RequestHeader("X-auth-role") String role){
		log.info("Preparing Excel for Bill Database update");
		if(!Objects.equals(excelFile.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
			throw new AppException("Can only upload .xlsx files", HttpStatus.BAD_REQUEST);
		}
		ResponseEntity<List<Item>> response = itemFeignClient.getItems(role);
		if(response.getStatusCode().isError()) {
			throw new AppException("Populate the item database first", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		List<GroceryBill> bills = excelFileService.excelToBillList(excelFile, response.getBody());
		int billsAffected = service.addOrUpdateBills(bills, overwrite);
		if(billsAffected > 0){
			return ResponseEntity.ok().header("bills-affected", String.valueOf(billsAffected)).build();
		}else {
			return ResponseEntity.noContent().build();
		}
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

	@PostMapping("/bills")
	public ResponseEntity<GroceryBill> createNewGroceryBill(@Valid @RequestBody GroceryBill groceryBill) {
		log.info("Creating Grocery Bill {}", groceryBill);
		return new ResponseEntity<>(service.addGroceryBill(groceryBill), HttpStatus.CREATED);
	}

	@GetMapping("/bills/{id}")
	public ResponseEntity<GroceryBill> getGroceryBill(@PathVariable("id") Integer id) {
		log.info("Fetching grocery bill with id: {}", id);
		GroceryBill groceryBill = service.getGroceryBill(id);
		if (groceryBill != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(groceryBill);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/bills/{id}")
	public ResponseEntity<Object> deleteGroceryBill(@PathVariable("id") Integer id) {
		log.info("Deleting grocery bill with id: {}", id);
		boolean success = service.deleteGroceryBill(id);
		if (success) {
			log.info("Delete success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/bills")
	public ResponseEntity<Object> updateGroceryBill(@Valid @RequestBody GroceryBill groceryBill) {
		log.info("Updating grocery bill: {}", groceryBill);
		GroceryBill updatedBill = service.updateGroceryBill(groceryBill);
		if (updatedBill != null) {
			log.info("Update success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
