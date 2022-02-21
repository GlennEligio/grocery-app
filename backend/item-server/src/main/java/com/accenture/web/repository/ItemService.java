package com.accenture.web.repository;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.Item;

@Service
public class ItemService {

	@Autowired
	ItemRepository repository;

	private static final Logger log = LoggerFactory.getLogger(ItemService.class);

	public List<Item> getAllItems() {
		log.info("Fetching items from database");
		return (List<Item>) repository.findAll();
	}

	public Item getItem(Integer id) {
		log.info("Fetching item with name " + id);
		return repository.findById(id).get();
	}

	public Item addItem(Item item) {
		log.info("Adding item in database " + item);
		return repository.save(item);
	}

	public boolean updateItem(Item item) {
		log.info("Updating item in database: " + item);
		Optional<Item> op = repository.findById(item.getId());
		if (op.isPresent()) {
			Item oldItem = op.get();
			oldItem.setName(item.getName());
			oldItem.setPrice(item.getPrice());
			oldItem.setDiscounted(item.isDiscounted());
			oldItem.setDiscountPercentage(item.getDiscountPercentage());
			repository.save(oldItem);
			return true;
		}
		return false;
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
