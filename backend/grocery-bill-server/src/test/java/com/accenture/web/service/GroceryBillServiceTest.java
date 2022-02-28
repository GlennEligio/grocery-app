package com.accenture.web.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.accenture.web.domain.*;
import com.accenture.web.exception.AppException;
import com.accenture.web.repository.GroceryBillRepository;
import com.accenture.web.repository.ItemRepository;
import com.accenture.web.repository.ShoppingClerkRepository;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class GroceryBillServiceTest {

    @Autowired
    private GroceryBillServiceImpl service;

    @MockBean
    private GroceryBillRepository billRepo;

    @MockBean
    private ItemRepository itemRepo;

    @MockBean
    private ShoppingClerkRepository clerkRepo;

    private GroceryBill bill;
    private List<GroceryBill> bills;
    private ShoppingClerk clerk;
    private Item item;
    private Item item1;

    @BeforeEach
    void setup(){
        clerk = new ShoppingClerk(0, "clerk0");
        item = new Item(0, "name0", 100, true, 0.5);
        item1 = new Item(1, "name1", 101, true, 0.5);
        List<Item> items = Arrays.asList(item, item1);

        bill = new DiscountedBill(clerk);
        bill.setItemList(items);
        bill.getTotalBill();
        bill.setId(0);

        RegularBill billRegular = new RegularBill(clerk);
        billRegular.setItemList(items);
        billRegular.getTotalBill();
        billRegular.setId(1);

        bills = Arrays.asList(bill, billRegular);
    }

    @Test
    @DisplayName("Get All Bills")
    public void getAllGroceryBill_withExistingBill_returnBills(){
        // Arrange
        when(billRepo.findAll()).thenReturn(bills);

        // Act
        List<GroceryBill> billsDb = service.getAllGroceryBills();

        // Assert
        assertEquals(billsDb, bills);
    }

    @Test
    @DisplayName("Get Existing Bill")
    public void getGroceryBill_withValidId_returnGroceryBill(){
        // Arrange
        Integer id = 0;
        when(billRepo.findById(0)).thenReturn(Optional.of(bill));

        // Act
        GroceryBill billDb = service.getGroceryBill(id);

        // Assert
        assertNotNull(billDb);
        assertEquals(billDb, bill);
    }

    @Test
    @DisplayName("Get Non existing Bill")
    public void getGroceryBill_withInvalidId_returnGroceryBill(){
        // Arrange
        Integer id = 3;
        when(billRepo.findById(3)).thenReturn(Optional.empty());

        // Assert
        assertThrows(AppException.class, () -> service.getGroceryBill(id));
    }

    @Test
    @DisplayName("Add Grocery Bill")
    public void addGroceryBill_withNewBill_returnNewBill(){
        // Arrange
        when(clerkRepo.findById(0)).thenReturn(Optional.of(clerk));
        when(itemRepo.findById(0)).thenReturn(Optional.empty());
        when(itemRepo.findById(1)).thenReturn(Optional.empty());
        when(itemRepo.save(item)).thenReturn(item);
        when(itemRepo.save(item1)).thenReturn(item1);
        when(billRepo.save(bill)).thenReturn(bill);

        // Act
        GroceryBill billDb = service.addGroceryBill(bill);

        // Assert
        assertNotNull(billDb);
        assertEquals(billDb, bill);
    }

    @Test
    @DisplayName("Update Existing Grocery Bill")
    public void updateGroceryBill_withExistingBill_returnUpdatedBill(){
        // Arrange
        Item updatedItem = new Item(1, "name1", 101, true, 0.5);
        GroceryBill updatedBill = bill;
        updatedBill.getItemList().set(1, updatedItem);
        when(clerkRepo.findById(0)).thenReturn(Optional.of(clerk));
        when(itemRepo.findById(0)).thenReturn(Optional.of(item));
        when(itemRepo.findById(1)).thenReturn(Optional.of(item1));
        when(itemRepo.save(item)).thenReturn(item);
        when(itemRepo.save(updatedItem)).thenReturn(updatedItem);
        when(billRepo.findById(0)).thenReturn(Optional.of(bill));
        when(billRepo.save(updatedBill)).thenReturn(updatedBill);

        // Act
        GroceryBill billDb = service.updateGroceryBill(bill);

        // Assert
        assertNotNull(billDb);
        assertEquals(updatedItem, billDb.getItemList().get(1));
    }

    @Test
    @DisplayName("Update Non existing Grocery Bill")
    public void updateGroceryBill_withNonExistingBill_returnNull(){
        // Arrange
        when(billRepo.findById(0)).thenReturn(Optional.empty());

        // Assert
        assertThrows(AppException.class, () -> service.updateGroceryBill(bill));
    }

    @Test
    @DisplayName("Delete Existing Grocery Bill")
    public void deleteGroceryBill_withExistingBill_returnTrue(){
        // Arrange
        Integer id = 0;
        when(billRepo.findById(0)).thenReturn(Optional.of(bill));

        // Act
        boolean success = service.deleteGroceryBill(id);

        // Assert
        assertTrue(success);
    }

    @Test
    @DisplayName("Delete Non Existing Grocery Bill")
    public void deleteGroceryBill_withNonExistingBill_returnFalse(){
        // Arrange
        Integer id = 3;
        when(billRepo.findById(3)).thenReturn(Optional.empty());

        // Assert
        assertThrows(AppException.class, () -> service.deleteGroceryBill(id));
    }
}
