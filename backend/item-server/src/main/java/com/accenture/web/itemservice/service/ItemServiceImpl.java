package com.accenture.web.itemservice.service;

import java.util.List;
import java.util.Optional;

import com.accenture.web.itemservice.exception.AppException;
import com.accenture.web.itemservice.domain.Item;
import com.accenture.web.itemservice.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemServiceImpl implements ItemService{

	public static final String PAGE_REQUEST_OUT_OF_BOUND = "Page request out of bound";
	@Autowired
	ItemRepository repository;

	private static final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);

	@Override
	public Page<Item> findByNameWithPagingAndSorting(String name, Pageable pageable) {
		// page - 1 since paging starts at 0th index
		Page<Item> itemPage = repository.findByNameQuery(name, pageable);
		if(pageable.getPageNumber() > itemPage.getTotalPages()){
			throw new AppException(PAGE_REQUEST_OUT_OF_BOUND, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
		}
		return itemPage;
	}

	@Override
	public Page<Item> findByIdWithPagingAndSorting(String id, Pageable pageable) {
		Page<Item> itemPage = repository.findByIdQuery(id, pageable);
		if(pageable.getPageNumber() > itemPage.getTotalPages()){
			throw new AppException(PAGE_REQUEST_OUT_OF_BOUND, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
		}
		return itemPage;
	}

	public Page<Item> findItemsWithPagingAndSorting(Pageable pageable){
		Page<Item> itemPage = repository.findAll(pageable);
		if(pageable.getPageNumber() > itemPage.getTotalPages()){
			throw new AppException(PAGE_REQUEST_OUT_OF_BOUND, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
		}
		return itemPage;
	}

	public List<Item> getAllItems() {
		log.info("Fetching items from database");
		return (List<Item>) repository.findAll();
	}

	// For Clerk
	public List<Item> getAllNotDeletedItems() {
		log.info("Fetching only not deleted items from database");
		return repository.findAllNotDeleted();
	}

	public Item getItem(Integer id) {
		log.info("Fetching item with id: {}", id);
		Optional<Item> itemOp = repository.findById(id);
		if(itemOp.isPresent()){
			return itemOp.get();
		}
		throw new AppException("Item with given id was not found", HttpStatus.NOT_FOUND);
	}

	public Item addItem(Item item) {
		log.info("Adding item in database: {}", item);
		List<Item> items = repository.findByNameContainingIgnoreCase(item.getName());
		if(!items.isEmpty()){
			throw new AppException("Item with same name already exist", HttpStatus.BAD_REQUEST);
		}
		return repository.save(item);
	}

	public Item updateItem(Item item) {
		log.info("Updating item in database: {}", item);
		Optional<Item> op = repository.findById(item.getId());
		if (op.isPresent()) {
			Item oldItem = op.get();
			oldItem.setName(item.getName());
			oldItem.setPrice(item.getPrice());
			oldItem.setDiscounted(item.isDiscounted());
			oldItem.setDiscountPercentage(item.getDiscountPercentage());
			return repository.save(oldItem);
		}
		throw new AppException("No Item found to be updated", HttpStatus.NOT_FOUND);
	}

	@Transactional
	public boolean deleteItem(Integer id) {
		log.info("Deleting item in database with id: {}", id);
		Optional<Item> op = repository.findById(id);
		if (op.isPresent()) {
			repository.softDelete(op.get().getId());
			return true;
		}
		throw new AppException("No Item found to be deleted", HttpStatus.NOT_FOUND);
	}

	@Override
	public int addOrUpdateItems(List<Item> items, boolean overwrite) {
		int itemsAffected = 0;
		for (Item item: items) {
			Optional<Item> itemOp = repository.findById(item.getId());
			if(itemOp.isEmpty()){
				repository.save(item);
				itemsAffected++;
			}else{
				if(overwrite){
					Item updatedItem = itemOp.get();
					updatedItem.setName(item.getName());
					updatedItem.setDiscounted(item.isDiscounted());
					updatedItem.setPrice(item.getPrice());
					updatedItem.setDiscountPercentage(item.getDiscountPercentage());
					repository.save(updatedItem);
					itemsAffected++;
				}
			}
		}
		return itemsAffected;
	}
}
