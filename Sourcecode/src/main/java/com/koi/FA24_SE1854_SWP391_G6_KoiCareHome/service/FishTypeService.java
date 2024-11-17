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

    private static final String FISH_TYPE_NOT_FOUND_MESSAGE = "FishType is not found with ";
    private static final String FISH_TYPE_ALREADY_EXISTED_MESSAGE = "FishType has already existed with name: ";

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
            throw new AlreadyExistedException(FISH_TYPE_ALREADY_EXISTED_MESSAGE + fishType.getName());
        }
        fishType.setCreateBy("User");
        fishType.setUpdateBy("User");
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
            throw new AlreadyExistedException(FISH_TYPE_ALREADY_EXISTED_MESSAGE + name);
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
    public FishType getFishTypeByID(int id) {
        return fishTypeRepository.findById(id).orElseThrow(() -> new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE
                + "id: " + id));
    }

    /**
     * Get one FishType by name
     *
     * @param name the name of the entity
     * @return the entity
     */
    public FishType getFishTypeByName(String name) {
        return fishTypeRepository.findByName(name).orElseThrow(() -> new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE
                + "name: " + name));

    }

    /**
     * Update a FishType.
     *
     * @param id the ID of the entity
     * @param updatedFishType the updated entity
     * @return the updated entity
     */
    public FishType updateFishType(int id, FishType updatedFishType) {
        FishType existingFishType = fishTypeRepository.findById(id).orElseThrow(() -> new NotFoundException
                (FISH_TYPE_NOT_FOUND_MESSAGE + "id: " + id));
        if (fishTypeRepository.existsByName(updatedFishType.getName()))
            throw new AlreadyExistedException(FISH_TYPE_ALREADY_EXISTED_MESSAGE + updatedFishType.getName());
        Optional.of(updatedFishType.getName()).ifPresent(existingFishType::setName);
        return fishTypeRepository.save(existingFishType);
    }

    /**
     * Delete the FishType by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        FishType existingFishType = fishTypeRepository.findById(id).orElseThrow(() -> new NotFoundException
                (FISH_TYPE_NOT_FOUND_MESSAGE + "id: " + id));
        fishTypeRepository.deleteByID(existingFishType.getFishTypeID());

    }
}