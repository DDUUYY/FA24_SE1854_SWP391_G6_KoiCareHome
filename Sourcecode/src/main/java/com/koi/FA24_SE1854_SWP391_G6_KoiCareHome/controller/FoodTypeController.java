package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FoodType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/foodType")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodTypeController {
    private final FoodTypeService foodTypeService;

    @Autowired
    public FoodTypeController(FoodTypeService foodTypeService) {
        this.foodTypeService = foodTypeService;
    }

    /**
     * Create a new FoodType.
     *
     * @param foodType the FoodType to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new FoodType
     */
    @PostMapping
    public ResponseEntity<FoodType> saveFoodType(@RequestBody FoodType foodType) {
        FoodType newFoodType = foodTypeService.saveFoodType(foodType);
        return ResponseEntity.ok(newFoodType);
    }

    /**
     * Get all FoodTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of FoodTypes
     */
    @GetMapping
    public List<FoodType> getAllFoodTypes() {
        return foodTypeService.getAllFoodTypes();
    }

    /**
     * Get a FoodType by ID.
     *
     * @param id the ID of the FoodType to get
     * @return the ResponseEntity with status 200 (OK) and with body of the FoodType,
     * or with status 404 (Not Found) if the FoodType does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<FoodType> getFoodTypeById(@PathVariable int id) {
        Optional<FoodType> FoodType = foodTypeService.getFoodTypeByID(id);
        return FoodType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Get a FoodType by Name
     *
     * @param name the Name of the FoodType to get
     * @return the ResponseEntity with status 200 (OK) and with body of the FoodType,
     * or with the status 404 (NotFound) if the FoodType does not exist
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<FoodType> getFoodTypeByName(@PathVariable String name) {
        if (name == null || name.trim().isEmpty())
            return ResponseEntity.badRequest().build();
        Optional<FoodType> foodType = foodTypeService.getFoodTypeByName(name);
        return foodType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Update a FoodType by ID.
     *
     * @param id the ID of the FoodType to update
     * @param FoodType the updated FoodType
     * @return the ResponseEntity with status 200 (OK) and with body of the updated FoodType,
     * or with status 404 (Not Found) if the FoodType does not exist
     */
    @PutMapping
    public ResponseEntity<FoodType> updateFoodType(@RequestParam(name = "FoodTypeId") int id, @RequestBody FoodType FoodType) {
        FoodType updatedFoodType = foodTypeService.updateFoodType(id, FoodType);
        return ResponseEntity.ok(updatedFoodType);
    }

    /**
     * Delete a FoodType by ID.
     *
     * @param id the ID of the FoodType to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "FoodType deleted successfully"
     */
    @DeleteMapping
    public ResponseEntity<String> deleteByID(@RequestParam(name = "FoodTypeId") int id) {
        foodTypeService.deleteByID(id);
        return ResponseEntity.ok("FoodType deleted successfully");
    }
}
