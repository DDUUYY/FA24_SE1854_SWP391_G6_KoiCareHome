package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FoodType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FoodTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FoodTypeService {
    private static final String FOOD_TYPE_NOT_FOUND_MESSAGE = "FoodType not found.";
    private static final String FOOD_TYPE_ALREADY_EXISTED_MESSAGE = "FoodType already existed.";

    private final FoodTypeRepository foodTypeRepository;

    @Autowired
    public FoodTypeService(FoodTypeRepository fishTypeRepository) {
        this.foodTypeRepository = fishTypeRepository;
    }

    /**
     * Save a FoodType.
     *
     * @param foodType the entity to save
     * @return the persisted entity
     */
    public FoodType saveFoodType(FoodType foodType) {
        if(foodTypeRepository.existsByName(foodType.getName()))
        {
            throw new AlreadyExistedException(FOOD_TYPE_ALREADY_EXISTED_MESSAGE);
        }
        foodType.setCreateBy("user");
        foodType.setUpdateBy("user");
        return foodTypeRepository.save(foodType);
    }

    /**
     * Get all the FoodTypes.
     *
     * @return the list of entities
     */
    public List<FoodType> getAllFoodTypes() {
        return foodTypeRepository.findAllFoodType();
    }

    /**
     * Get one FoodType by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Optional<FoodType> getFoodTypeByID(int id) {
        Optional<FoodType> existingFoodType = foodTypeRepository.findById(id);
        if (existingFoodType.isPresent()) {
            return existingFoodType;
        } else {
            throw new NotFoundException(FOOD_TYPE_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Get one FoodType by name
     *
     * @param name the name of the entity
     * @return the entity
     */
    public Optional<FoodType> getFoodTypeByName(String name) {
        Optional<FoodType> existingFoodType = foodTypeRepository.findByName(name);
        if (existingFoodType.isPresent()) {
            return existingFoodType;
        } else {
            throw new NotFoundException(FOOD_TYPE_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Update a FoodType.
     *
     * @param id the ID of the entity
     * @param updatedFoodType the updated entity
     * @return the updated entity
     */
    public FoodType updateFoodType(int id, FoodType updatedFoodType) {
        Optional<FoodType> existingFoodType = foodTypeRepository.findById(id);
        if (existingFoodType.isPresent()) {
            FoodType fishType = existingFoodType.get();
            fishType.setName(updatedFoodType.getName());
            fishType.setUpdateBy("user");
            return foodTypeRepository.save(fishType);
        } else {
            throw new NotFoundException(FOOD_TYPE_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Delete the FoodType by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        if(foodTypeRepository.findById(id).isPresent()){
            foodTypeRepository.deleteByID(id);
        } else{
            throw new NotFoundException(FOOD_TYPE_NOT_FOUND_MESSAGE);
        }

    }
}
