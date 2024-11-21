package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.CalculateFoodService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
/**
 * @author Quach To Anh
 */

@RestController
@RequestMapping("/api/calculate/food")
@CrossOrigin(origins = "http://localhost:5173")
public class CalculateFoodController {

    private final CalculateFoodService calculateFoodService;

    public CalculateFoodController(CalculateFoodService calculateFoodService) {
        this.calculateFoodService = calculateFoodService;
    }

    @GetMapping("/{pondId}")
    public BigDecimal calculateFoodBaseOnWeights(@PathVariable int pondId, @RequestParam(name = "growthStage") float growthStage) {
        return calculateFoodService.calculateKoiFoodBasedOnWeights(pondId, growthStage);
    }
}