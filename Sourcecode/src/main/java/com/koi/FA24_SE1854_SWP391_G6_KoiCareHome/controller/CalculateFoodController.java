package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.CalculateFoodService;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FishService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/calculate/food")
public class CalculateFoodController {

    private final FishService fishService;
    private final CalculateFoodService calculateFoodService;

    public CalculateFoodController(FishService fishService, CalculateFoodService calculateFoodService) {
        this.fishService = fishService;
        this.calculateFoodService = calculateFoodService;
    }

    @GetMapping("/{pondId}")
    public float calculateFoodBaseOnWeights(@PathVariable int pondId) {
        float calculated = calculateFoodService.calculateFoodBaseOnWeights(pondId);
        return calculated;
    }
}
