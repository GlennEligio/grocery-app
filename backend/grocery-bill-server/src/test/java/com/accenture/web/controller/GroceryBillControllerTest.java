package com.accenture.web.controller;

import static org.mockito.Mockito.*;

import com.accenture.web.domain.*;
import com.accenture.web.service.GroceryBillServiceImpl;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

@WebMvcTest(GroceryBillController.class)
public class GroceryBillControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroceryBillServiceImpl service;

    private static final Logger log = LoggerFactory.getLogger(GroceryBillController.class);
    private Gson gson;
    private GroceryBill bill;
    private List<GroceryBill> bills;
    private ShoppingClerk clerk;
    List<Item> items;


    @BeforeEach
    void setup(){
        gson = new Gson();
        clerk = new ShoppingClerk(0, "clerk0");
        Item item = new Item(0, "name0", 100, true, 0.5);
        Item item1 = new Item(1, "name1", 101, true, 0.5);
        items = Arrays.asList(item, item1);

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
    public void getAllGroceryBills_withExistingBills_returnOk() throws Exception {
        // Arrange
        when(service.getAllGroceryBills()).thenReturn(bills);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/groceryBills"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(gson.toJson(bills)));
    }

    @Test
    @DisplayName("Get Non existent Bills")
    public void getAllGroceryBills_withNonExistingBills_returnNotFound() throws Exception {
        // Arrange
        when(service.getAllGroceryBills()).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/groceryBills"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Get Existing Bill")
    public void getGroceryBill_withExistingBill_returnOk() throws Exception {
        // Arrange
        Integer id = 0;
        when(service.getGroceryBill(id)).thenReturn(bill);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/groceryBills/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(gson.toJson(bill)));
    }

    @Test
    @DisplayName("Get Non existent Bill")
    public void getGroceryBill_withNonExistingBill_returnNotFound() throws Exception {
        // Arrange
        Integer id = 3;
        when(service.getGroceryBill(id)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/groceryBills/" + id))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // TODO Find way to make service.addGroceryBill Mock work without Mockito.any()
    @Test
    @DisplayName("Create New Bill")
    public void createGroceryBill_withNewBill_returnCreated() throws Exception {
        // Arrange
        GroceryBill newBill = new DiscountedBill(clerk);
        newBill.setItemList(items);
        newBill.getTotalBill();
        JsonElement jsonElement = gson.toJsonTree(newBill);
        jsonElement.getAsJsonObject().addProperty("type", "discounted");    // add the required "type" field
        when(service.addGroceryBill(Mockito.any())).thenReturn(bill);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/groceryBills")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(jsonElement)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(gson.toJson(bill)));
    }

    @Test
    @DisplayName("Create Non Existing Bill")
    public void createGroceryBill_withNonExistingBill_returnNotFound() throws Exception {
        // Arrange
        GroceryBill newBill = new DiscountedBill(clerk);
        newBill.setItemList(items);
        newBill.getTotalBill();
        JsonElement jsonElement = gson.toJsonTree(newBill);
        jsonElement.getAsJsonObject().addProperty("type", "discounted");    // add the required "type" field
        when(service.addGroceryBill(newBill)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/groceryBills")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(jsonElement)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Delete Existing Bill")
    public void deleteGroceryBill_withValidId_returnOk() throws Exception {
        // Arrange
        Integer id = 0;
        when(service.deleteGroceryBill(id)).thenReturn(true);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/groceryBills/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Delete Non Existing Bill")
    public void deleteGroceryBill_withInvalidId_returnNotFound() throws Exception {
        // Arrange
        Integer id = 3;
        when(service.deleteGroceryBill(id)).thenReturn(false);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/groceryBills/" + id))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // TODO Find way to make service.updateGroceryBill Mock work without Mockito.any()
    @Test
    @DisplayName("Update Existing Bill")
    public void updateGroceryBill_withExistingBill_returnOk() throws Exception {
        // Arrange
        JsonElement jsonElement = gson.toJsonTree(bill);
        jsonElement.getAsJsonObject().addProperty("type", "discounted");
        when(service.updateGroceryBill(Mockito.any())).thenReturn(bill);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/groceryBills")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(jsonElement)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Update Non Existing Bill")
    public void updateGroceryBill_withNonExistingBill_returnNotFound() throws Exception {
        // Arrange
        GroceryBill newBill = bill;
        JsonElement jsonElement = gson.toJsonTree(bill);
        jsonElement.getAsJsonObject().addProperty("type", "discounted");
        GroceryBill billInput = gson.fromJson(jsonElement, DiscountedBill.class);
        when(service.updateGroceryBill(billInput)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/groceryBills")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(jsonElement)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
