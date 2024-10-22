package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Quach To Anh
 */
@RestController
@RequestMapping("/api/fish")
@CrossOrigin(origins = "http://localhost:5173")
public class FishController {
    private final FishService fishService;

    @Autowired
    public FishController(FishService fishService) {
        this.fishService = fishService;
    }

    /**
     * Create a new Fish.
     *
     * @param fish the Fish to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new Fish
     */
    @PostMapping
    public ResponseEntity<Fish> saveFish(@RequestBody Fish fish) {
        Fish newFish = fishService.saveFish(fish);
        return ResponseEntity.ok(newFish);
    }

    /**
     * Get all Fishes.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of Fishes
     */
    @GetMapping
    public List<Fish> getAllFishes() {
        return fishService.getAllFishes();
    }

    /**
     * Get all Fishes in a pond.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of Fishes
     */
    @GetMapping("/all-fish-in-pond/{pondId}")
    public List<Fish> getAllFishesWithPondId(@PathVariable int pondId) {
        return fishService.getAllFishesWithPondId(pondId);
    }

    /**
     * Get a Fish by ID.
     *
     * @param id the ID of the Fish to get
     * @return the ResponseEntity with status 200 (OK) and with body of the Fish,
     * or with status 404 (Not Found) if the Fish does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<Fish> getFishById(@PathVariable int id) {
        Optional<Fish> fish = fishService.getFishById(id);
        return fish.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Get a Fish by Name in a specific pond.
     *
     * @param pondId the ID of the Fish's pond
     * @param name the name of the Fish
     * @return the ResponseEntity with status 200 (OK) and with body of the Fish,
     * or with status 404 (Not Found) if the Fish does not exist
     */
    @GetMapping("/pond/{pondId}")
    public ResponseEntity<Fish> getFishByNameWithPondId(@PathVariable int pondId, @RequestBody String name) {
        Optional<Fish> fish = fishService.getFishByNameWithPondId(name, pondId);
        return fish.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Update a Fish by ID.
     *
     * @param id the ID of the Fish to update
     * @param fish the updated Fish
     * @return the ResponseEntity with status 200 (OK) and with body of the updated Fish,
     * or with status 404 (Not Found) if the Fish does not exist
     */
    @PutMapping("/{id}")
    public ResponseEntity<Fish> updateFish(@PathVariable int id, @RequestBody Fish fish) {
        Fish updatedFish = fishService.updateFish(id, fish);
        return ResponseEntity.ok(updatedFish);
    }

    /**
     * Delete a Fish by ID.
     *
     * @param id the ID of the Fish to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "Fish deleted successfully"
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFish(@PathVariable int id) {
        fishService.deleteByID(id);
        return ResponseEntity.ok("Fish deleted successfully");
    }
}
