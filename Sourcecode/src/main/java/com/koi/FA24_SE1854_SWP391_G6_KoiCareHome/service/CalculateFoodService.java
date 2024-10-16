package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CalculateFoodService {

    private final FishRepository fishrepository;

    public CalculateFoodService(FishRepository fishrepository) {
        this.fishrepository = fishrepository;
    }

    /**
     * Calculate food.
     *
     * @return the calculated amount
     */
    public float calculateFoodBaseOnWeights(int pondId) {
        List<Fish> fishes = fishrepository.findAllFishWithPondId(pondId);
        float baseOnWeights = 0;
        for (Fish fish : fishes) {
            baseOnWeights += fish.getWeight();
        }
        return baseOnWeights*0.02f;
    }
}
