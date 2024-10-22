package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FishTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Quach To Anh
 */
@RestController
@RequestMapping("/api/fishType")
@CrossOrigin(origins = "http://localhost:5173")
public class FishTypeController {
    private final FishTypeService fishTypeService;

    @Autowired
    public FishTypeController(FishTypeService fishTypeService) {
        this.fishTypeService = fishTypeService;
    }

    /**
     * Create a new FishType.
     *
     * @param fishType the FishType to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new FishType
     */
    @PostMapping
    public ResponseEntity<FishType> saveFishType(@RequestBody FishType fishType) {
        FishType newFishType = fishTypeService.saveFishType(fishType);
        return ResponseEntity.ok(newFishType);
    }

    /**
     * Get all FishTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of FishTypes
     */
    @GetMapping
    public List<FishType> getAllFishTypes() {
        return fishTypeService.getAllFishTypes();
    }

    /**
     * Get a FishType by ID.
     *
     * @param id the ID of the FishType to get
     * @return the ResponseEntity with status 200 (OK) and with body of the FishType,
     * or with status 404 (Not Found) if the FishType does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<FishType> getFishTypeById(@PathVariable int id) {
        Optional<FishType> fishType = fishTypeService.getFishTypeByID(id);
        return fishType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Get a FishType by Name
     *
     * @param name the Name of the FishType to get
     * @return the ResponseEntity with status 200 (OK) and with body of the FishType,
     * or with the status 404 (NotFound) if the FishType does not exist
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<FishType> getFishTypeByName(@PathVariable String name) {
        if (name == null || name.trim().isEmpty())
            return ResponseEntity.badRequest().build();
        Optional<FishType> fishType = fishTypeService.getFishTypeByName(name);
        return fishType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Update a FishType by ID.
     *
     * @param id the ID of the FishType to update
     * @param fishType the updated FishType
     * @return the ResponseEntity with status 200 (OK) and with body of the updated FishType,
     * or with status 404 (Not Found) if the FishType does not exist
     */
    @PutMapping
    public ResponseEntity<FishType> updateFishType(@RequestParam(name = "fishTypeId") int id, @RequestBody FishType fishType) {
        FishType updatedFishType = fishTypeService.updateFishType(id, fishType);
        return ResponseEntity.ok(updatedFishType);
    }

    /**
     * Delete a FishType by ID.
     *
     * @param id the ID of the FishType to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "FishType deleted successfully"
     */
    @DeleteMapping
    public ResponseEntity<String> deleteByID(@RequestParam(name = "fishTypeId") int id) {
        fishTypeService.deleteByID(id);
        return ResponseEntity.ok("FishType deleted successfully");
    }
}
