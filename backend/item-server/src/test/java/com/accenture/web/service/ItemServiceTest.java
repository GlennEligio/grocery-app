package com.accenture.web.service;

import static org.mockito.Mockito.*;

import com.accenture.web.domain.Item;
import com.accenture.web.exception.AppException;
import com.accenture.web.repository.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemServiceTest {

    @Autowired
    private ItemServiceImpl service;

    @MockBean
    private ItemRepository repository;

    private Item item;
    private List<Item> items;

    @BeforeEach
    void setup(){
        item = new Item(0, "name0", 100, true, 0.5);
        items = Arrays.asList(new Item(0, "name0", 100, true, 0.5),
                new Item(1, "name1", 101, true, 0.5),
                new Item(2, "name2", 102, true, 0.5));
    }

    @Test
    @DisplayName("Get All Items")
    public void getAllItems_withExistingItems_returnItems(){
        // Arrange
        when(repository.findAll()).thenReturn(items);

        // Act
        List<Item> itemsResult = service.getAllItems();

        // Assert
        assertNotNull(itemsResult);
        assertEquals(itemsResult, items);
    }

    @Test
    @DisplayName("Get Item with Valid Id")
    public void getItem_withValidId_returnItem(){
        // Arrange
        Integer id = 0;
        when(repository.findById(0)).thenReturn(Optional.of(item));

        // Act
        Item itemDb = service.getItem(id);

        // Assert
        assertNotNull(itemDb);
        assertEquals(itemDb.getId(), id);

    }
    
    @Test
    @DisplayName("Get Item with Invalid Id")
    public void getItem_withInvalidId_throwsException(){
        // Arrange
        Integer id = 3;
        when(repository.findById(3)).thenReturn(Optional.empty());

        // Assert
        assertThrows(AppException.class, () -> service.getItem(id));
    }

    @Test
    @DisplayName("Add New Item")
    public void addItem_withNewItem_returnItem(){
        // Arrange
        Item newItem = new Item("name0", 100, true, 0.5);
        when(repository.save(newItem)).thenReturn(item);

        // Act
        Item itemDb = service.addItem(newItem);

        // Assert
        assertNotNull(itemDb);
        assertEquals(newItem.getName(), itemDb.getName());
        assertEquals(newItem.getPrice(), itemDb.getPrice());
        assertEquals(newItem.getDiscountPercentage(), itemDb.getDiscountPercentage());
        assertEquals(newItem.isDiscounted(), itemDb.isDiscounted());
    }

    @Test
    @DisplayName("Update Existing Item")
    public void updateItem_withExistingItem_returnUpdatedItem(){
        // Arrange
        Item updatedItem = new Item(0, "name0", 1000, true, 0.8);
        when(repository.findById(0)).thenReturn(Optional.of(item));
        when(repository.save(updatedItem)).thenReturn(updatedItem);

        // Act
        Item newItem = service.updateItem(updatedItem);

        // Assert
        assertNotNull(newItem);
        assertEquals(newItem.getId(), updatedItem.getId());
    }

    @Test
    @DisplayName("Update Non-existing Item")
    public void updateItem_withNonExistingItem_returnUpdatedItem(){
        // Arrange
        Item updatedItem = new Item(1, "name0", 1000, true, 0.8);
        when(repository.findById(1)).thenReturn(Optional.empty());

        // Assert
        assertThrows(AppException.class, () -> service.updateItem(updatedItem));
    }

    @Test
    @DisplayName("Delete Existing Item")
    public void deleteItem_withExistingItem_returnTrue(){
        // Arrange
        Integer id = 0;
        when(repository.findById(0)).thenReturn(Optional.of(item));

        // Act
        boolean success = service.deleteItem(id);

        // Assert
        assertTrue(success);
    }

    @Test
    @DisplayName("Delete Non existing Item")
    public void deleteItem_withNonExistingItem_returnTrue(){
        // Arrange
        Integer id = 1;
        when(repository.findById(1)).thenReturn(Optional.empty());

        // Assert
        assertThrows(AppException.class, () -> service.deleteItem(id));
    }
}