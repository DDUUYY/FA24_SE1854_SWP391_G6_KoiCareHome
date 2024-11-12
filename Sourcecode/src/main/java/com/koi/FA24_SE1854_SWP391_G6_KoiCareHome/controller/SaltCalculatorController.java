package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationResponse;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.SaltCalculatorService;
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
    public ResponseEntity<SaltCalculationResponse> calculateSalt(@RequestBody SaltCalculationRequest request) {

        SaltCalculationResponse response = saltCalculatorService.calculateSalt(request);
        return ResponseEntity.ok(response);
    }
}
