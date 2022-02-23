package com.accenture.web.service;

import java.util.List;
import java.util.Optional;

import com.accenture.web.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.Item;

@Service
public class ItemServiceImpl implements ItemService{

	@Autowired
    ItemRepository repository;

	private static final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);

	public List<Item> getAllItems() {
		log.info("Fetching items from database");
		return (List<Item>) repository.findAll();
	}

	public Item getItem(Integer id) {
		log.info("Fetching item with name " + id);
		Optional<Item> itemOp = repository.findById(id);
		if(itemOp.isPresent()){
			return itemOp.get();
		}
		return null;
	}

	public Item addItem(Item item) {
		log.info("Adding item in database " + item);
		return repository.save(item);
	}

	public Item updateItem(Item item) {
		log.info("Updating item in database: " + item);
		Optional<Item> op = repository.findById(item.getId());
		if (op.isPresent()) {
			Item oldItem = op.get();
			oldItem.setName(item.getName());
			oldItem.setPrice(item.getPrice());
			oldItem.setDiscounted(item.isDiscounted());
			oldItem.setDiscountPercentage(item.getDiscountPercentage());
			return repository.save(oldItem);
		}
		return null;
	}

	public boolean deleteItem(Integer id) {
		log.info("Deleting item in database with id: " + id);
		Optional<Item> op = repository.findById(id);
		if (op.isPresent()) {
			repository.delete(op.get());
			return true;
		}
		return false;
	}
}
