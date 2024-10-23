package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FishTypeService {

    private static final String FISH_TYPE_NOT_FOUND_MESSAGE = "FishType not found.";
    private static final String FISH_TYPE_ALREADY_EXISTED_MESSAGE = "FishType already existed.";

    private final FishTypeRepository fishTypeRepository;

    @Autowired
    public FishTypeService(FishTypeRepository fishTypeRepository) {
        this.fishTypeRepository = fishTypeRepository;
    }

    /**
     * Save a FishType.
     *
     * @param fishType the entity to save
     * @return the persisted entity
     */
    public FishType saveFishType(FishType fishType) {
        if(fishTypeRepository.existsByName(fishType.getName()))
        {
            throw new AlreadyExistedException(FISH_TYPE_ALREADY_EXISTED_MESSAGE);
        }
        fishType.setCreateBy("user");
        fishType.setUpdateBy("user");
        return fishTypeRepository.save(fishType);
    }

    /**
     * Save a FishType by name.
     *
     * @param name the name of the entity to save
     * @return the persisted entity
     */
    public FishType saveFishTypeByName(String name) {
        if(fishTypeRepository.existsByName(name))
        {
            throw new AlreadyExistedException(FISH_TYPE_ALREADY_EXISTED_MESSAGE);
        }
        FishType fishType = new FishType();
        fishType.setName(name);
        fishType.setCreateBy("user");
        fishType.setUpdateBy("user");
        return fishTypeRepository.save(fishType);
    }

    /**
     * Get all the FishTypes.
     *
     * @return the list of entities
     */
    public List<FishType> getAllFishTypes() {
        return fishTypeRepository.findAllFishType();
    }

    /**
     * Get one FishType by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Optional<FishType> getFishTypeByID(int id) {
        Optional<FishType> existingFishType = fishTypeRepository.findById(id);
        if (existingFishType.isPresent()) {
            return existingFishType;
        } else {
            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Get one FishType by name
     *
     * @param name the name of the entity
     * @return the entity
     */
    public Optional<FishType> getFishTypeByName(String name) {
        Optional<FishType> existingFishType = fishTypeRepository.findByName(name);
        if (existingFishType.isPresent()) {
            return existingFishType;
        } else {
            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
        }
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
            fishType.setName(updatedFishType.getName());
            fishType.setUpdateBy("user");
            return fishTypeRepository.save(fishType);
        } else {
            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Delete the FishType by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        if(fishTypeRepository.existsById(id)){
            updateFishType(id, fishTypeRepository.findById(id).get());
            fishTypeRepository.deleteByID(id);
        } else{
            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
        }

    }
}
