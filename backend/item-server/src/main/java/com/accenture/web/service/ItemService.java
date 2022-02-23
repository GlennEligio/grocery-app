package com.accenture.web.service;

import com.accenture.web.domain.Item;

import java.util.List;

public interface ItemService {
    List<Item> getAllItems();

    Item getItem(Integer id);

    Item addItem(Item item);

    Item updateItem(Item item);

    boolean deleteItem(Integer id);
}
