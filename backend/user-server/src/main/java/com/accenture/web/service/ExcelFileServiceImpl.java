package com.accenture.web.service;

import com.accenture.web.domain.User;
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
    public ByteArrayInputStream userListToExcelFile(List<User> items) {
        try(Workbook workbook = new XSSFWorkbook()){
            Sheet sheet = workbook.createSheet("Users");

            Row row = sheet.createRow(0);

            // Creating header
            Cell cell = row.createCell(0);
            cell.setCellValue("ID");

            cell = row.createCell(1);
            cell.setCellValue("Name");

            cell = row.createCell(2);
            cell.setCellValue("Username");

            cell = row.createCell(3);
            cell.setCellValue("Password");

            cell = row.createCell(4);
            cell.setCellValue("Active");

            cell = row.createCell(5);
            cell.setCellValue("Roles");

            // Creating data rows for each item
            for(int i = 0; i < items.size(); i++) {
                Row dataRow = sheet.createRow(i + 1);
                dataRow.createCell(0).setCellValue(items.get(i).getId());
                dataRow.createCell(1).setCellValue(items.get(i).getName());
                dataRow.createCell(2).setCellValue(items.get(i).getUsername());
                dataRow.createCell(3).setCellValue(items.get(i).getPassword());
                dataRow.createCell(4).setCellValue(items.get(i).isActive());
                dataRow.createCell(5).setCellValue(items.get(i).getRoles());
            }

            // Making size of column auto resize to fit with data
            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);
            sheet.autoSizeColumn(4);
            sheet.autoSizeColumn(5);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public List<User> excelFileToUserList(MultipartFile excelFile) {
        try(Workbook workbook = new XSSFWorkbook(excelFile.getInputStream());){
            List<User> users = new ArrayList<>();
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i<sheet.getPhysicalNumberOfRows(); i++) {
                User user = new User();
                Row row = sheet.getRow(i);

                user.setId((int) row.getCell(0, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK).getNumericCellValue());
                user.setName(row.getCell(1).getStringCellValue());
                user.setUsername(row.getCell(2).getStringCellValue());
                user.setPassword(row.getCell(3).getStringCellValue());
                user.setActive(row.getCell(4).getBooleanCellValue());
                user.setRoles(row.getCell(5).getStringCellValue());
                users.add(user);
            }
            return users;
        }catch (IOException ex){
            ex.printStackTrace();
            return new ArrayList<>();
        }
    }
}
