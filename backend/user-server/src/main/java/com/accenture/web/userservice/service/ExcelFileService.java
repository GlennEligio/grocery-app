package com.accenture.web.userservice.service;

import com.accenture.web.userservice.domain.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface ExcelFileService {

    ByteArrayInputStream userListToExcelFile(List<User> items);
    List<User> excelFileToUserList(MultipartFile excelFile);
}
