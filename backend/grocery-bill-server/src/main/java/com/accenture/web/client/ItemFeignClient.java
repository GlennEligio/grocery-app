package com.accenture.web.client;

import com.accenture.web.domain.Item;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "item-service")
public interface ItemFeignClient {

    @GetMapping("/api/v1/items/")
    public ResponseEntity<List<Item>> getItems();

}
