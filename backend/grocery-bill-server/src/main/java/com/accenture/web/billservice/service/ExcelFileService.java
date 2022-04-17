package com.accenture.web.billservice.service;

import com.accenture.web.billservice.domain.GroceryBill;
import com.accenture.web.billservice.domain.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface ExcelFileService {

    ByteArrayInputStream billListToExcel(List<GroceryBill> bills);
    List<GroceryBill> excelToBillList(MultipartFile excelFile, List<Item> items);
}
