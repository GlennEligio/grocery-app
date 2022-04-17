package com.accenture.web.billservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.accenture.web.billservice.exception.AppException;
import com.accenture.web.billservice.repository.ShoppingClerkRepository;
import com.accenture.web.billservice.repository.GroceryBillRepository;
import com.accenture.web.billservice.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.accenture.web.billservice.domain.GroceryBill;
import com.accenture.web.billservice.domain.Item;
import com.accenture.web.billservice.domain.ShoppingClerk;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GroceryBillServiceImpl implements GroceryBillService{

	public static final String PAGE_REQUEST_OUT_OF_BOUND = "Page request out of bound";

	@Autowired
    GroceryBillRepository billRepo;

	@Autowired
    ShoppingClerkRepository clerkRepo;

	@Autowired
    ItemRepository itemRepo;

	private static final Logger log = LoggerFactory.getLogger(GroceryBillServiceImpl.class);

	public List<GroceryBill> getAllGroceryBills() {
		return (List<GroceryBill>) billRepo.findAll();
	}

	public Page<GroceryBill> findBillsWithPagingAndSorting(Pageable pageable){
		Page<GroceryBill> billPage = billRepo.findAll(pageable);
		if(pageable.getPageNumber() > billPage.getTotalPages()){
			throw new AppException(PAGE_REQUEST_OUT_OF_BOUND, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
		}
		return billPage;
	}

	public Page<GroceryBill> findBillsWithIdPagingAndSorting(String id, Pageable pageable) {
		Page<GroceryBill> billPage = billRepo.findByIdContaining(id, pageable);
		if(pageable.getPageNumber() > billPage.getTotalPages()){
			throw new AppException(PAGE_REQUEST_OUT_OF_BOUND, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
		}
		return billPage;
	}

	public Page<GroceryBill> findBillsWithShoppingClerkUsernamePagingAndSorting(String username, Pageable pageable) {
		Page<GroceryBill> billPage = billRepo.findByShoppingClerkUsername(username, pageable);
		if(pageable.getPageNumber() > billPage.getTotalPages()){
			throw new AppException(PAGE_REQUEST_OUT_OF_BOUND, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
		}
		return billPage;
	}

	@Transactional
	public int addOrUpdateBills(List<GroceryBill> bills, boolean overwrite) {
		int billsAffected = 0;
		for (GroceryBill bill: bills) {
			Optional<GroceryBill> itemOp = billRepo.findById(bill.getId());
			if(itemOp.isEmpty()){
				addGroceryBill(bill);
				billsAffected++;
			}else{
				if(overwrite){
					updateGroceryBill(bill);
					billsAffected++;
				}
			}
		}
		return billsAffected;
	}

	public GroceryBill getGroceryBill(Integer id) {
		Optional<GroceryBill> billOp = billRepo.findById(id);
		if(billOp.isPresent()){
			return billOp.get();
		}
		throw new AppException("Grocery with id given was not found", HttpStatus.NOT_FOUND);
	}

	@Transactional
	public GroceryBill addGroceryBill(GroceryBill groceryBill) {
		log.info("Adding bill: {}", groceryBill);
		// Check if bill already exist
		if(!billRepo.findByBillId(groceryBill.getBillId()).isEmpty()){
			throw new AppException("Bill of same Bill Id already exist", HttpStatus.BAD_REQUEST);
		}

		// To set the value of totalBill and bill id
		groceryBill.getTotalBill();
		groceryBill.getChange();
		groceryBill.setBillId(String.valueOf(System.currentTimeMillis()));

		// Check if Shopping Clerk already exist in database
		Optional<ShoppingClerk> clerkOp = clerkRepo.findById(groceryBill.getShoppingClerk().getId());
		if (clerkOp.isPresent()) {
			ShoppingClerk clerkDb = clerkOp.get();
			clerkDb.setUsername(groceryBill.getShoppingClerk().getUsername());
			groceryBill.setShoppingClerk(clerkDb);
		}

		// Check if Items already exist in db
		// If it exists, update properties of Item
		if (groceryBill.getItemList() != null) {
			List<Item> newItems = groceryBill.getItemList().stream().map(item -> {
				Optional<Item> itemOp = itemRepo.findById(item.getId());
				if (itemOp.isPresent()) {
					Item itemDb = itemOp.get();
					log.info("Item: {}", item);
					log.info("ItemDb: {}", itemDb);
					itemDb.setName(item.getName());
					itemDb.setPrice(item.getPrice());
					itemDb.setDiscounted(item.isDiscounted());
					itemDb.setDiscountPercentage(item.getDiscountPercentage());
					return itemRepo.save(itemDb);
				}
				return itemRepo.save(item);
			}).collect(Collectors.toList());
			groceryBill.setItemList(newItems);
		}

		// Set the date created time
		groceryBill.setDateCreated(LocalDateTime.now());

		return billRepo.save(groceryBill);
	}

	@Transactional
	public GroceryBill updateGroceryBill(GroceryBill groceryBill) {
		Optional<GroceryBill> op = billRepo.findById(groceryBill.getId());
		if (op.isPresent()) {
			GroceryBill oldGroceryBill = op.get();
			
			// Check if Shopping Clerk already exist in db
			Optional<ShoppingClerk> clerkOp = clerkRepo.findById(oldGroceryBill.getShoppingClerk().getId());
			if (clerkOp.isPresent()) {
				ShoppingClerk clerkDb = clerkOp.get();
				clerkDb.setUsername(groceryBill.getShoppingClerk().getUsername());
				oldGroceryBill.setShoppingClerk(clerkDb);
			}
			
			// Check if Items already exist in db
			// If it exist, update properties of Item except name
			if (oldGroceryBill.getItemList() != null) {
				List<Item> newItems = groceryBill.getItemList().stream().map(item -> {
					Optional<Item> itemOp = itemRepo.findById(item.getId());
					if (itemOp.isPresent()) {
						Item itemDb = itemOp.get();
						log.info("Item: {}", item);
						log.info("ItemDb: {}", itemDb);
						itemDb.setName(item.getName());
						itemDb.setPrice(item.getPrice());
						itemDb.setDiscounted(item.isDiscounted());
						itemDb.setDiscountPercentage(item.getDiscountPercentage());
						return itemRepo.save(itemDb);
					}
					return itemRepo.save(item);
				}).collect(Collectors.toList());
				oldGroceryBill.setItemList(newItems);
			}
			return billRepo.save(oldGroceryBill);
		}
		throw new AppException("GroceryBill to update was not found", HttpStatus.NOT_FOUND);
	}

	@Transactional
	public boolean deleteGroceryBill(Integer id) {
		Optional<GroceryBill> billOp = billRepo.findById(id);
		if (billOp.isPresent()) {
			billRepo.softDelete(billOp.get().getId());
			return true;
		}
		throw new AppException("Grocerybill to delete was not found", HttpStatus.NOT_FOUND);
	}

}
