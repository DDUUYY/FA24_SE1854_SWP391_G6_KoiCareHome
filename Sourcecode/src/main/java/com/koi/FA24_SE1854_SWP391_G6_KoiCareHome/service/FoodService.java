package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Food;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FoodType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FoodRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FoodTypeRepository;
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
    private final FoodTypeRepository foodTypeRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository, FoodTypeRepository foodTypeRepository) {
        this.foodRepository = foodRepository;
        this.foodTypeRepository = foodTypeRepository;
    }

    /**
     * Save a kind of Food.
     *
     * @param food the entity to save
     * @return the persisted entity
     */
    public Food saveFood(Food food) {
        if(foodRepository.existsById(food.getFoodID()))
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
        Optional<Food> existingFood = foodRepository.findFoodById(id);
        if (existingFood.isPresent()) {
            return existingFood;
        } else {
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Update a find of Food.
     *
     * @param id the ID of the entity
     * @param updatedFood the updated entity
     * @return the updated entity
     */
    public Food updateFood(int id, Food updatedFood) {
        Optional<Food> existingFood = foodRepository.findFoodById(id);
        if (existingFood.isEmpty()) {
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }
        Food food = existingFood.get();
        if (!foodTypeRepository.existsById(food.getFoodTypeID())) {
            throw new NotFoundException(FOOD_ALREADY_EXISTED_MESSAGE);
        }
        food.setFoodTypeID(updatedFood.getFoodTypeID());
        food.setName(updatedFood.getName());
        food.setDescription(updatedFood.getDescription());
        food.setVendor(updatedFood.getVendor());
        food.setWeight(updatedFood.getWeight());
        food.setUpdateBy("user");
        return foodRepository.save(food);
    }

    /**
     * Delete the Food by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        if(foodRepository.findFoodById(id).isPresent()){
            updateFood(id, foodRepository.findFoodById(id).get());
            foodRepository.deleteByID(id);
        } else{
            throw new NotFoundException(FOOD_NOT_FOUND_MESSAGE);
        }
    }
}