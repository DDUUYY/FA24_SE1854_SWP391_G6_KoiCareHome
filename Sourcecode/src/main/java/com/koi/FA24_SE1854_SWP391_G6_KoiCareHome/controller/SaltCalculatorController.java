package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.validation.SaltCalculateValidation;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationResponse;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.SaltCalculatorService;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NetworkException;  // Import exception
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.DatabaseException; // Import exception
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class SaltCalculatorController {

    @Autowired
    private SaltCalculatorService saltCalculatorService;

    @PostMapping("/calculate-salt")
    public ResponseEntity<?> calculateSalt(@RequestBody SaltCalculationRequest request) {
        String validationErrors = SaltCalculateValidation.validateSaltCalculationRequest(request);
        if (validationErrors != null) {
            return ResponseEntity.badRequest().body(validationErrors); // Trả về lỗi nếu dữ liệu không hợp lệ
        }

        try {
            // Giả sử khi tính toán, có thể có sự cố với kết nối mạng hoặc cơ sở dữ liệu
            SaltCalculationResponse response = saltCalculatorService.calculateSalt(request);
            return ResponseEntity.ok(response); // Trả về kết quả nếu hợp lệ
        } catch (NetworkException e) {
            return ResponseEntity.status(500).body("Network error: " + e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }
}
