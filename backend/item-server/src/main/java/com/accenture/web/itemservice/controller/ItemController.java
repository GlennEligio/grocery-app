package com.accenture.web.itemservice.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import com.accenture.web.itemservice.exception.AppException;
import com.accenture.web.itemservice.service.ExcelFileService;
import org.apache.commons.compress.utils.IOUtils;
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

import com.accenture.web.itemservice.domain.Item;
import com.accenture.web.itemservice.service.ItemServiceImpl;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class ItemController {

	@Autowired
	private ExcelFileService excelFileService;

	@Autowired
	private ItemServiceImpl service;

	private static final Logger log = LoggerFactory.getLogger(ItemController.class);

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

	@PostMapping("/items/upload")
	public ResponseEntity<Object> upload(@RequestParam("file")MultipartFile excelFile, @RequestParam("overwrite") Boolean overwrite){
		log.info("Preparing Excel for Item Database update");
		if(!Objects.equals(excelFile.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")){
			throw new AppException("Can only upload .xlsx files", HttpStatus.BAD_REQUEST);
		}
		List<Item> items = excelFileService.excelFileToItemList(excelFile);
		int itemsAffected = service.addOrUpdateItems(items, overwrite);
		if(itemsAffected > 0){
			log.info("Successfully updated item database using the excel file");
			return ResponseEntity.ok().header("Item affected", String.valueOf(itemsAffected)).build();
		}
		log.info("No changes done in database");
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/items/download")
	public void download(HttpServletResponse response) throws IOException {
		log.info("Preparing Item list for Download");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=items.xlsx");
		ByteArrayInputStream stream = excelFileService.itemListToExcelFile(service.getAllItems());
		IOUtils.copy(stream, response.getOutputStream());
	}

	@GetMapping("/items/download/template")
	public void downloadTemplate(HttpServletResponse response) throws IOException {
		log.info("Preparing Item list for Download");
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=items.xlsx");
		// Creating Dummy Item list
		List<Item> dummyItems = new ArrayList<>();
		dummyItems.add(new Item(0, "Dummy item name", 45, false, 0.06));
		dummyItems.add(new Item(1, "Dummy item name1", 50, true, 0.50));
		ByteArrayInputStream stream = excelFileService.itemListToExcelFile(dummyItems);
		IOUtils.copy(stream, response.getOutputStream());
	}

	// TODO: UPDATE TEST CASE
	@GetMapping("/items")
	public ResponseEntity<List<Item>> getAllItems(@RequestHeader("X-auth-role") String role){
		log.info("Fetching items");
		if(role.equals("ROLE_CLERK")){
			return ResponseEntity.ok(service.getAllNotDeletedItems());
		}
		return ResponseEntity.ok(service.getAllItems());
	}

	@GetMapping("/items/{id}")
	public ResponseEntity<Item> getItem(@PathVariable("id") Integer id){
		log.info("Fetching item with id: {}", id);
		Item item = service.getItem(id);
		if(item != null) {
			log.info("Fetch success");
			return ResponseEntity.ok(item);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping(value = "/items", consumes = "application/json")
	public ResponseEntity<Object> createItem(@Valid @RequestBody Item item){
		log.info("Adding item: {}", item);
		return new ResponseEntity<>(service.addItem(item), HttpStatus.CREATED);
	}

	@DeleteMapping("/items/{id}")
	public ResponseEntity<Object> deleteItem(@PathVariable("id") Integer id){
		log.info("Deleting item with id: {}", id);
		boolean success = service.deleteItem(id);
		if(success) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping(value="/items", consumes = "application/json")
	public ResponseEntity<Object> updateItem(@Valid @RequestBody Item item){
		log.info("Updating item: {}", item);
		Item itemUpdated = service.updateItem(item);
		if(itemUpdated != null) {
			log.info("Update success");
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
