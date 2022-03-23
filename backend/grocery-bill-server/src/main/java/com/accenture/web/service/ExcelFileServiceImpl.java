package com.accenture.web.service;

import com.accenture.web.controller.GroceryBillController;
import com.accenture.web.domain.*;
import com.accenture.web.dto.BillWithItemAmountDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExcelFileServiceImpl implements ExcelFileService{

    private static final Logger log = LoggerFactory.getLogger(ExcelFileServiceImpl.class);

    @Override
    public ByteArrayInputStream billListToExcelFile(List<GroceryBill> bills) {
        try(Workbook workbook = new XSSFWorkbook()){
            // Transform GroceryBill into BillsWithItemCount
            List<BillWithItemAmountDto> billWithItemAmountDtoList = bills.stream()
                    .map(BillWithItemAmountDto::new)
                    .collect(Collectors.toList());

            // Create Sheet and Row
            Sheet sheet = workbook.createSheet("Grocery Bills");
            Row row = sheet.createRow(0);

            // Creating headers
            Cell cell = row.createCell(0);
            cell.setCellValue("Id");

            cell = row.createCell(1);
            cell.setCellValue("Shopping Clerk Username");

            cell = row.createCell(2);
            cell.setCellValue("Total Bill");

            cell = row.createCell(3);
            cell.setCellValue("Date created");

            cell = row.createCell(4);
            cell.setCellValue("Bill Type");

            // Creating headers for item ids
            /*
                1. Create Set of Item ids
                2. Iterate through the Set of Item ids to create Map for Item id and their Column Position in a Row
            */
            Set<Integer> itemIds = new HashSet<>();
            for (BillWithItemAmountDto bill: billWithItemAmountDtoList) {
                itemIds.addAll(bill.getItemIdWithAmount().keySet());
            }

            // Sort Set of Item ids
            List<Integer> itemIdsSorted = itemIds.stream().sorted(Integer::compare).collect(Collectors.toList());

            Map<Integer, Integer> itemIdAndColumnPos = new HashMap<>();
            int rowPosition = 5;
            for (Integer itemId: itemIdsSorted) {
                cell = row.createCell(rowPosition);
                cell.setCellValue(itemId);
                itemIdAndColumnPos.put(itemId, rowPosition);
                rowPosition++;
            }

            // Creating data rows for each item
            for(int i = 0; i < billWithItemAmountDtoList.size(); i++) {
                BillWithItemAmountDto bill = billWithItemAmountDtoList.get(i);
                Row dataRow = sheet.createRow(i + 1);
                dataRow.createCell(0).setCellValue(bill.getId());
                dataRow.createCell(1).setCellValue(bill.getClerk().getUsername());
                dataRow.createCell(2).setCellValue(bill.getTotalBill());
                dataRow.createCell(3).setCellValue(bill.getDateCreated().toString());
                dataRow.createCell(4).setCellValue(bill.getType());
                // Iterate through the itemIds in bill
                for(Integer itemId : bill.getItemIdWithAmount().keySet()){
                    // Fetch the Column position of specific item id
                    if(itemIdAndColumnPos.containsKey(itemId)){
                        // Insert the amount of item in the cell in column position
                        dataRow.createCell(itemIdAndColumnPos.get(itemId)).setCellValue(bill.getItemIdWithAmount().get(itemId));
                    }
                }
            }

            // Making size of column auto resize to fit with data
            for(int i = 0; i < rowPosition; i++){
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());
        }catch (IOException ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public List<GroceryBill> excelFileToBillList(MultipartFile excelFile, List<Item> items) {
        try(Workbook workbook = new XSSFWorkbook(excelFile.getInputStream())){
            log.info("Items received: {}", items);
            Sheet sheet = workbook.getSheetAt(0);

            Set<Integer> itemIds = new HashSet<>();

            log.info("Fetching item ids from header row");
            // Header row
            Row headerRow = sheet.getRow(0);

            // Fetch all item ids in header row (5th column onwards)
            for(int i=5; i<headerRow.getPhysicalNumberOfCells(); i++){
                log.info("New item id from header");
                itemIds.add((int) headerRow.getCell(i).getNumericCellValue());
            }
            log.info("Result Set of Item ids: {}", itemIds);

            // Filter items using the Set of Ids present in GroceryBills excel file
            Set<Item> filteredItem = items.stream()
                    .filter(item -> itemIds.contains(item.getId()))
                    .collect(Collectors.toSet());
            log.info("Result of Set of Items: {}", filteredItem);

            // Iterate through all row after header row and create a list of Bills with it
            List<GroceryBill> bills = new ArrayList<>();

            log.info("Iterating through the rows for bills");
            for(int i =1; i<sheet.getPhysicalNumberOfRows(); i++){
                // Initialize Grocery Bill
                GroceryBill bill = null;
                Row billRow = sheet.getRow(i);

                // Fetch information about bill
                log.info("Fetching all information in a row");
                Integer id = (int) billRow.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK).getNumericCellValue();
                String shoppingClerkUsername = billRow.getCell(1).getStringCellValue();
                LocalDateTime dateCreated = LocalDateTime.parse(billRow.getCell(3).getStringCellValue());
                String type = billRow.getCell(4).getStringCellValue();

                // Fetch bill items and amounts
                log.info("Populating arrayList for bill's items");
                List<Item> billItems = new ArrayList<>();
                for (int c = 5; c < billRow.getPhysicalNumberOfCells(); c++){
                    Double itemAmount = billRow.getCell(c, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK).getNumericCellValue();
                    log.info("Amount found: {}", itemAmount);
                    if(itemAmount > 0){
                        Integer itemId = (int) headerRow.getCell(c).getNumericCellValue();
                        List<Item> filteredBillItems = filteredItem.stream().filter(item -> item.getId().equals(itemId)).collect(Collectors.toList());
                        if(filteredBillItems.size() > 0){
                            Item billItem = filteredBillItems.get(0);
                            log.info("Item to use: {}", billItem);
                            for (int j = 0; j < itemAmount; j++) {
                                billItems.add(billItem);
                                log.info("Adding item: {}", j+1);
                            }
                        }
                    }
                }

                if(type.equals("discounted")){
                    bill = new DiscountedBill(new ShoppingClerk(shoppingClerkUsername),
                            billItems,
                            dateCreated);
                } else {
                    bill = new RegularBill(new ShoppingClerk(shoppingClerkUsername),
                            billItems,
                            dateCreated);
                }
                bill.setId(id);
                bill.getTotalBill();
                bills.add(bill);
                log.info("Added bill in bill list: {}", bill);
            }
            return bills;
        }catch (IOException ex){
            ex.printStackTrace();
            return null;
        }
    }
}
