package com.accenture.web.billservice.repository;

import org.springframework.data.repository.CrudRepository;

import com.accenture.web.billservice.domain.Item;

public interface ItemRepository extends CrudRepository<Item, Integer>{

}
