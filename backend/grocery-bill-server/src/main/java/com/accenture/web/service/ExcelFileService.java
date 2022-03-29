package com.accenture.web.service;

import com.accenture.web.domain.GroceryBill;
import com.accenture.web.domain.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface ExcelFileService {

    ByteArrayInputStream billListToExcel(List<GroceryBill> bills);
    List<GroceryBill> excelToBillList(MultipartFile excelFile, List<Item> items);
}
