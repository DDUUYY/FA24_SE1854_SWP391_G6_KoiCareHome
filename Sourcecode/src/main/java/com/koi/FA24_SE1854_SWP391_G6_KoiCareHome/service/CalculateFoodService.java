package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.PondRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CalculateFoodService {

    private final FishRepository fishRepository;
    private final BigDecimal percent = BigDecimal.valueOf(1);
    private double optimalTemperatureMin = 15.0;
    private double optimalTemperatureMax = 24.0;

    public CalculateFoodService(FishRepository fishRepository) {
        this.fishRepository = fishRepository;
    }

    /**
     * Calculate food.
     *
     * @return the calculated amount
     */
    public BigDecimal calculateKoiFoodBasedOnWeights(int pondId, float growthRate) {
        List<Fish> koiFishes = fishRepository.findAllFishWithPondId(pondId);

        BigDecimal totalWeight = BigDecimal.ZERO;
        for (Fish fish : koiFishes) {
            totalWeight = totalWeight.add(fish.getWeight());
        }

        BigDecimal foodBaseOnWeight = totalWeight.multiply(percent);

        // Adjust the food requirement based on the growth rate
        BigDecimal growthRateFactor = BigDecimal.valueOf(1 + growthRate);

        // Final calculation for food requirement
        BigDecimal finalFoodRequirement = foodBaseOnWeight.multiply(growthRateFactor);

        return finalFoodRequirement;
    }

}