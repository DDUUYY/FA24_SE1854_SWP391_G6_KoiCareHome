package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CalculateFoodService {

    private BigDecimal percentage = new BigDecimal("0.02");

    private final FishRepository fishrepository;

    public CalculateFoodService(FishRepository fishrepository) {
        this.fishrepository = fishrepository;
    }

    /**
     * Calculate food.
     *
     * @return the calculated amount
     */
    public BigDecimal calculateFoodBaseOnWeights(int pondId) {
        List<Fish> fishes = fishrepository.findAllFishWithPondId(pondId);
        BigDecimal baseOnWeights = BigDecimal.valueOf(0.00);
        for (Fish fish : fishes) {
            baseOnWeights = baseOnWeights.add(fish.getWeight());
        }
        return baseOnWeights.multiply(percentage);
    }

    public BigDecimal getTotalPondWeight(int pondId) {
        List<Fish> fishes = fishrepository.findAllFishWithPondId(pondId);
        BigDecimal baseOnWeights = BigDecimal.valueOf(0.00);
        for (Fish fish : fishes) {
            baseOnWeights = baseOnWeights.add(fish.getWeight());
        }
        return baseOnWeights;
    }
}
