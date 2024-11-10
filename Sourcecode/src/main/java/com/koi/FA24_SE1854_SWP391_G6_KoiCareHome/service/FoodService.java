package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Food;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
    private static final String FOOD_NOT_FOUND_MESSAGE = "Food not found.";
    private static final String FOOD_ALREADY_EXISTED_MESSAGE = "Food already existed.";

    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository fishRepository) {
        this.foodRepository = fishRepository;
    }

    /**
     * Save Food.
     *
     * @param food the entity to save
     * @return the persisted entity
     */
    public Food saveFood(Food food) {
        if(foodRepository.existsByName(food.getName()))
        {
            throw new AlreadyExistedException(FOOD_ALREADY_EXISTED_MESSAGE);
        }
        food.setCreateBy("user");
        food.setUpdateBy("user");
        return foodRepository.save(food);
    }

    /**
     * Get all the Foods.
     *
     * @return the list of entities
     */
    public List<Food> getAllFoods() {
        return foodRepository.findAllFood();
    }

    /**
     * Get one Food by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Optional<Food> getFoodByID(int id) {
        Optional<Food> existingFood = foodRepository.findById(id);
        if (existingFood.isPresent()) {
            return existingFood;
        } else {
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Get one Food by name
     *
     * @param name the name of the entity
     * @return the entity
     */
    public Optional<Food> getFoodByName(String name) {
        Optional<Food> existingFood = foodRepository.findByName(name);
        if (existingFood.isPresent()) {
            return existingFood;
        } else {
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Update Food.
     *
     * @param id the ID of the entity
     * @param updatedFood the updated entity
     * @return the updated entity
     */
    public Food updateFood(int id, Food updatedFood) {
        Optional<Food> existingFood = foodRepository.findById(id);
        if (existingFood.isPresent()) {
            Food fish = existingFood.get();
            fish.setName(updatedFood.getName());
            fish.setUpdateBy("user");
            return foodRepository.save(fish);
        } else {
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Delete the Food by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        if(foodRepository.findById(id).isPresent()){
            foodRepository.deleteByID(id);
        } else{
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }

    }
}
