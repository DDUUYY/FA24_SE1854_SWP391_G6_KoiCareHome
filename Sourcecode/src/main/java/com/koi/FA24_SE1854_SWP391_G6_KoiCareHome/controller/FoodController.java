package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Food;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {
    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    /**
     * Create a new Food.
     *
     * @param food the Food to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new Food
     */
    @PostMapping
    public ResponseEntity<Food> saveFood(@RequestBody Food food) {
        Food newFood = foodService.saveFood(food);
        return ResponseEntity.ok(newFood);
    }

    /**
     * Get all Foods.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of Foods
     */
    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    /**
     * Get a Food by ID.
     *
     * @param id the ID of the Food to get
     * @return the ResponseEntity with status 200 (OK) and with body of the Food,
     * or with status 404 (Not Found) if the Food does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable int id) {
        Optional<Food> food = foodService.getFoodByID(id);
        return food.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Update a kind of Food by ID.
     *
     * @param id the ID of the Food to update
     * @param food the updated Food
     * @return the ResponseEntity with status 200 (OK) and with body of the updated Food,
     * or with status 404 (Not Found) if the Food does not exist
     */
    @PutMapping
    public ResponseEntity<Food> updateFood(@RequestParam(name = "foodId") int id, @RequestBody Food food) {
        Food updatedFood = foodService.updateFood(id, food);
        return ResponseEntity.ok(updatedFood);
    }

    /**
     * Delete a Food by ID.
     *
     * @param id the ID of the Food to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "Food deleted successfully"
     */
    @DeleteMapping
    public ResponseEntity<String> deleteByID(@RequestParam(name = "foodId") int id) {
        foodService.deleteByID(id);
        return ResponseEntity.ok("Food deleted successfully");
    }
}
