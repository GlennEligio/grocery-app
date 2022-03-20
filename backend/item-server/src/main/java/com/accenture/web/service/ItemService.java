package com.accenture.web.service;

import com.accenture.web.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ItemService {
    Page<Item> findByNameWithPagingAndSorting(String name, Pageable pageable);

    Page<Item> findByIdWithPagingAndSorting(String id, Pageable pageable);

    Page<Item> findItemsWithPaging(Pageable pageable);

    Page<Item> findItemsWithPagingAndSorting(Pageable pageable);

    List<Item> getAllItems();

    Item getItem(Integer id);

    Item addItem(Item item);

    Item updateItem(Item item);

    boolean deleteItem(Integer id);

    int addOrUpdateItem(List<Item> items, boolean overwrite);
}
