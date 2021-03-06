package com.accenture.web.itemservice.controller;

import static org.mockito.Mockito.*;

import com.accenture.web.itemservice.domain.Item;
import com.accenture.web.itemservice.exception.AppException;
import com.accenture.web.itemservice.service.ExcelFileServiceImpl;
import com.accenture.web.itemservice.service.ItemServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.persistence.EntityManagerFactory;
import java.util.Arrays;
import java.util.List;

@WebMvcTest(ItemController.class)
class ItemControllerTest {

    private static final Logger log = LoggerFactory.getLogger(ItemController.class);

    @MockBean
    private ItemServiceImpl service;

    @MockBean
    private ExcelFileServiceImpl excelFileService;

    @MockBean
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    private MockMvc mockMvc;

    private Item item;
    private List<Item> items;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(){
        objectMapper = new ObjectMapper();
        item = new Item(0, "name0", 100, true, 0.5);
        items = Arrays.asList(new Item(0, "name0", 100, true, 0.5),
                new Item(1, "name1", 101, true, 0.5),
                new Item(2, "name2", 102, true, 0.5));
    }

    @Test
    @DisplayName("Get All Items")
    void getAllItems_withExistingUser_returnOk() throws Exception {
        // Arrange
        when(service.getAllItems()).thenReturn(items);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/items").header("X-auth-role", "ROLE_SADMIN"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(items)));
    }

    // TODO: Create test case for GET endpoints with paging and sorting

    @Test
    @DisplayName("Get Existing item")
    void getItem_withValidId_returnOk() throws Exception {
        // Arrange
        int id = 0;
        when(service.getItem(0)).thenReturn(item);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/items/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(item)));
    }

    @Test
    @DisplayName("Get Non existing item")
    void getItem_withInvalidId_returnOk() throws Exception {
        // Arrange
        Integer id = 3;
        when(service.getItem(3)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/items/"+id))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Add New Item")
    void addItem_withNewItem_returnCreated() throws Exception {
        // Arrange
        Item newItem = new Item("name0", 100, true, 0.5);
        item.setDeleteFlag(false);
        when(service.addItem(newItem)).thenReturn(item);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newItem)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(item)));
    }

    @Test
    @DisplayName("Add Existing Item")
    void addItem_withExistingItem_returnNotFound() throws Exception {
        // Arrange
        Item existingItem = new Item("name3", 103, true, 0.5);
        when(service.addItem(existingItem)).thenThrow(new AppException("Item with same name already exist", HttpStatus.BAD_REQUEST));

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(existingItem)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    @DisplayName("Delete Existing Item")
    void deleteItem_withValidId_returnOk() throws Exception {
        // Arrange
        int id = 0;
        when(service.deleteItem(0)).thenReturn(true);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/items/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Delete Non existing Item")
    void deleteItem_withInvalidId_returnNotFound() throws Exception {
        // Arrange
        int id = 3;
        when(service.deleteItem(3)).thenReturn(false);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/items/" + id))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DisplayName("Update Existing Item")
    void updateItem_withExistingItem_returnOk() throws Exception {
        // Arrange
        Item existingItem = new Item(0, "name0", 1000, true, 0.5);
        when(service.updateItem(existingItem)).thenReturn(existingItem);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(existingItem)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Update Non existing Item")
    void updateItem_withNonExistingItem_returnOk() throws Exception {
        // Arrange
        Item nonExistingItem = new Item(3, "name0", 1000, true, 0.5);
        when(service.updateItem(nonExistingItem)).thenReturn(null);

        // Assert
        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nonExistingItem)))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
