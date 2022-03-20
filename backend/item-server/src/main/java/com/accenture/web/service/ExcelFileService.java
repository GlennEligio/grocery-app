package com.accenture.web.service;

import com.accenture.web.domain.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface ExcelFileService {

    ByteArrayInputStream itemListToExcelFile(List<Item> items);
    List<Item> excelFileToItemList(MultipartFile excelFile);
}
