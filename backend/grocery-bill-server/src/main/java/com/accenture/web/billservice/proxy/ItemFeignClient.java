package com.accenture.web.billservice.proxy;

import com.accenture.web.billservice.domain.Item;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "item-service", url = "${ITEM_SERVICE_URI:http://localhost}:8030")
public interface ItemFeignClient {

    @GetMapping("/api/v1/items/")
    public ResponseEntity<List<Item>> getItems(@RequestHeader("X-auth-role") String role);

}
