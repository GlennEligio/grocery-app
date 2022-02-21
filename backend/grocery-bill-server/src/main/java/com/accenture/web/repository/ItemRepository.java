package com.accenture.web.repository;

import org.springframework.data.repository.CrudRepository;

import com.accenture.web.domain.Item;

public interface ItemRepository extends CrudRepository<Item, Integer>{

}
