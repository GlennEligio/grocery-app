package com.accenture.web.itemservice.service;

import com.accenture.web.itemservice.domain.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface ExcelFileService {

    ByteArrayInputStream itemListToExcelFile(List<Item> items);
    List<Item> excelFileToItemList(MultipartFile excelFile);
}
