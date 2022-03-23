package com.accenture.web.service;

import com.accenture.web.domain.GroceryBill;
import com.accenture.web.domain.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface ExcelFileService {

    ByteArrayInputStream billListToExcelFile (List<GroceryBill> bills);
    List<GroceryBill> excelFileToBillList (MultipartFile excelFile, List<Item> items);
}
