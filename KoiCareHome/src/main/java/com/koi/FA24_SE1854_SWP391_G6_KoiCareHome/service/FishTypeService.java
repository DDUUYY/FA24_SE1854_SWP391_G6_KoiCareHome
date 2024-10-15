package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishTypeRepository;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FishTypeService {
    private final FishTypeRepository fishTypeRepository;

    @Autowired
    public FishTypeService(FishTypeRepository fishTypeRepository) {
        this.fishTypeRepository = fishTypeRepository;
    }

    /**
     * Save a FishType.
     *
     * @param FishType the entity to save
     * @return the persisted entity
     */
    public FishType saveFishType(FishType FishType) {
        return fishTypeRepository.save(FishType);
    }

    /**
     * Get all the FishTypes.
     *
     * @return the list of entities
     */
    public List<FishType> getAllFishTypes() {
        return fishTypeRepository.findAll();
    }

    /**
     * Get one FishType by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Optional<FishType> getFishTypeByID(int id) {
        return fishTypeRepository.findById(id);
    }

    /**
     * Update a FishType.
     *
     * @param id the ID of the entity
     * @param updatedFishType the updated entity
     * @return the updated entity
     */
    public FishType updateFishType(int id, FishType updatedFishType) {
        Optional<FishType> existingFishType = fishTypeRepository.findById(id);
        if (existingFishType.isPresent()) {
            FishType fishType = existingFishType.get();
            return fishTypeRepository.save(fishType);
        } else {
            throw new RuntimeException("FishType not found");
        }
    }

    /**
     * Delete the FishType by ID.
     *
     * @param id the ID of the entity
     */
    public void deleteByID(int id) {
        fishTypeRepository.deleteByID(id);
    }
}
