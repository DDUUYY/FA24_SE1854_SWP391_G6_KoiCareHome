package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.ConsumeFoodHistory;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.ConsumeFoodHistoryRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumeFoodHistoryService {

    private static final String CONSUME_FOOD_HISTORY_NOT_FOUND_MESSAGE = "ConsumeFoodHistory not found";
    private static final String FISH_NOT_FOUND_MESSAGE = "Fish not found";

    private final ConsumeFoodHistoryRepository consumeFoodHistoryRepository;
    private final FishRepository fishRepository;

    public ConsumeFoodHistoryService(ConsumeFoodHistoryRepository consumeFoodHistoryRepository, FishRepository fishRepository) {
        this.consumeFoodHistoryRepository = consumeFoodHistoryRepository;
        this.fishRepository = fishRepository;
    }

    /**
     * Save a ConsumeFoodHistory of a ConsumeFoodHistory.
     *
     * @param consumeFoodHistory the entity to save
     * @return the persisted entity
     */
    public ConsumeFoodHistory saveConsumeFoodHistory(ConsumeFoodHistory consumeFoodHistory) {
        if(!fishRepository.existsById(consumeFoodHistory.getFishID()))
        {
            throw new NotFoundException(FISH_NOT_FOUND_MESSAGE);
        }
        consumeFoodHistory.setCreateBy("user");
        consumeFoodHistory.setUpdateBy("user");
        return consumeFoodHistoryRepository.save(consumeFoodHistory);
    }

    /**
     * Get all the ConsumeFoodHistory of a ConsumeFoodHistory.
     *
     * @return the list of entities
     */
    public List<ConsumeFoodHistory> findAllByFishId(int fishId) {
        return consumeFoodHistoryRepository.findAllByFishID(fishId);
    }

    /**
     * Get ConsumeFoodHistory by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Optional<ConsumeFoodHistory> getConsumeFoodHistoryById(int id) {
        Optional<ConsumeFoodHistory> existingConsumeFoodHistory = consumeFoodHistoryRepository.findById(id);
        if (existingConsumeFoodHistory.isEmpty()) {
            throw new NotFoundException(CONSUME_FOOD_HISTORY_NOT_FOUND_MESSAGE);
        }
        return existingConsumeFoodHistory;
    }



}
