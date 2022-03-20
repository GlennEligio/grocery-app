package com.accenture.web.service;

import com.accenture.web.domain.Item;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelFileServiceImpl implements ExcelFileService{

    @Override
    public ByteArrayInputStream itemListToExcelFile(List<Item> items) {
        try(Workbook workbook = new XSSFWorkbook()){
            Sheet sheet = workbook.createSheet("Customers");

            Row row = sheet.createRow(0);

            // Creating header
            Cell cell = row.createCell(0);
            cell.setCellValue("ID");

            cell = row.createCell(1);
            cell.setCellValue("Name");

            cell = row.createCell(2);
            cell.setCellValue("Price");

            cell = row.createCell(3);
            cell.setCellValue("Discounted");

            cell = row.createCell(4);
            cell.setCellValue("Discounted Percentage");

            // Creating data rows for each item
            for(int i = 0; i < items.size(); i++) {
                Row dataRow = sheet.createRow(i + 1);
                dataRow.createCell(0).setCellValue(items.get(i).getId());
                dataRow.createCell(1).setCellValue(items.get(i).getName());
                dataRow.createCell(2).setCellValue(items.get(i).getPrice());
                dataRow.createCell(3).setCellValue(items.get(i).isDiscounted());
                dataRow.createCell(4).setCellValue(items.get(i).getDiscountPercentage());
            }

            // Making size of column auto resize to fit with data
            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);
            sheet.autoSizeColumn(4);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Item> excelFileToItemList(MultipartFile excelFile) {
        try(Workbook workbook = new XSSFWorkbook(excelFile.getInputStream());){
            List<Item> items = new ArrayList<>();
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i<sheet.getPhysicalNumberOfRows(); i++) {
                Item item = new Item();
                Row row = sheet.getRow(i);

                item.setId((int) row.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK).getNumericCellValue());
                item.setName(row.getCell(1).getStringCellValue());
                item.setPrice(row.getCell(2).getNumericCellValue());
                item.setDiscounted(row.getCell(3).getBooleanCellValue());
                item.setDiscountPercentage(row.getCell(4).getNumericCellValue());
                items.add(item);
            }
            return items;
        }catch (IOException ex){
            ex.printStackTrace();
            return null;
        }
    }
}
