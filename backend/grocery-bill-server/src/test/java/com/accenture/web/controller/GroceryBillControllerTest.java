package com.accenture.web.controller;

import static org.mockito.Mockito.*;

import com.accenture.web.domain.*;
import com.accenture.web.service.GroceryBillServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
class GroceryBillControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroceryBillServiceImpl service;

    private static final Logger log = LoggerFactory.getLogger(GroceryBillController.class);
    private ObjectMapper objectMapper;
    private GroceryBill bill;
    private List<GroceryBill> bills;
    private ShoppingClerk clerk;
    List<Item> items;


    @BeforeEach
    void setup(){
        objectMapper = new ObjectMapper();
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
    void getAllGroceryBills_withExistingBills_returnOk() throws Exception {
        // Arrange
        when(service.getAllGroceryBills()).thenReturn(bills);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/bills"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(bills)));
    }

    @Test
    @DisplayName("Get Non existent Bills")
    void getAllGroceryBills_withNonExistingBills_returnNotFound() throws Exception {
        // Arrange
        when(service.getAllGroceryBills()).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/bills"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Get Existing Bill")
    void getGroceryBill_withExistingBill_returnOk() throws Exception {
        // Arrange
        Integer id = 0;
        when(service.getGroceryBill(id)).thenReturn(bill);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/bills/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(bill)));
    }

    @Test
    @DisplayName("Get Non existent Bill")
    void getGroceryBill_withNonExistingBill_returnNotFound() throws Exception {
        // Arrange
        Integer id = 3;
        when(service.getGroceryBill(id)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/bills/" + id))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // TODO Find way to make service.addGroceryBill Mock work without Mockito.any()
    @Test
    @DisplayName("Create New Bill")
    void createGroceryBill_withNewBill_returnCreated() throws Exception {
        // Arrange
        GroceryBill newBill = new DiscountedBill(clerk);
        newBill.setItemList(items);
        newBill.getTotalBill();
        ObjectNode objectNode = objectMapper.valueToTree(newBill);
        objectNode.put("type", "discounted");   // add the "type" required property
        when(service.addGroceryBill(Mockito.any())).thenReturn(bill);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/bills")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectNode.toPrettyString()))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(bill)));
    }

    @Test
    @DisplayName("Create Non Existing Bill")
    void createGroceryBill_withNonExistingBill_returnNotFound() throws Exception {
        // Arrange
        GroceryBill newBill = new DiscountedBill(clerk);
        newBill.setItemList(items);
        newBill.getTotalBill();
        ObjectNode objectNode = objectMapper.valueToTree(newBill);
        objectNode.put("type", "discounted");   // add the "type" field required
        when(service.addGroceryBill(newBill)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/bills")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectNode.toPrettyString()))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Delete Existing Bill")
    void deleteGroceryBill_withValidId_returnOk() throws Exception {
        // Arrange
        Integer id = 0;
        when(service.deleteGroceryBill(id)).thenReturn(true);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/bills/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Delete Non Existing Bill")
    void deleteGroceryBill_withInvalidId_returnNotFound() throws Exception {
        // Arrange
        Integer id = 3;
        when(service.deleteGroceryBill(id)).thenReturn(false);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/bills/" + id))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // TODO Find way to make service.updateGroceryBill Mock work without Mockito.any()
    @Test
    @DisplayName("Update Existing Bill")
    void updateGroceryBill_withExistingBill_returnOk() throws Exception {
        // Arrange
        ObjectNode objectNode = objectMapper.valueToTree(bill);
        objectNode.put("type", "discounted");
        when(service.updateGroceryBill(Mockito.any())).thenReturn(bill);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/bills")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectNode.toPrettyString()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Update Non Existing Bill")
    void updateGroceryBill_withNonExistingBill_returnNotFound() throws Exception {
        // Arrange
        GroceryBill newBill = bill;
        ObjectNode objectNode = objectMapper.valueToTree(bill);
        objectNode.put("type", "discounted");
        GroceryBill billInput = objectMapper.treeToValue(objectNode, DiscountedBill.class);
        when(service.updateGroceryBill(billInput)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/bills")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectNode.toPrettyString()))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
