package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        try {
            Fish newFish = fishService.saveFish(fish);
            return ResponseEntity.ok(newFish);
        } catch (AlreadyExistedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
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
    @GetMapping("/pond/{pondId}")
    public List<Fish> getAllFishesWithPondId(@PathVariable int pondId) {
        return fishService.getAllFishesWithPondId(pondId);
    }

    /**
     * Get all Fishes under Member id.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of Fishes
     */
    @GetMapping("/member")
    public List<Fish> getAllFishesWithMemberId(@RequestParam(name = "memberId") int memberId) {
        return fishService.getAllFishWithMemberId(memberId);
    }

    /**
     * Get a Fish by ID.
     *
     * @param fishId the ID of the Fish to get
     * @return the ResponseEntity with status 200 (OK) and with body of the Fish,
     * or with status 404 (Not Found) if the Fish does not exist
     */
    @GetMapping("/{fishId}")
    public ResponseEntity<Fish> getFishById(@PathVariable int fishId) {
        try {
            Fish fish = fishService.getFishById(fishId);
            return ResponseEntity.ok(fish);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Get a Fish by Name in a specific pond.
     *
     * @param pondId   the ID of the Fish's pond
     * @param fishName the name of the Fish
     * @return the ResponseEntity with status 200 (OK) and with body of the Fish,
     * or with status 404 (Not Found) if the Fish does not exist
     */
    @GetMapping("/pond")
    public ResponseEntity<Fish> getFishByNameWithPondId(@RequestParam(name = "fishName") String fishName,
                                                        @RequestParam(name = "pondId") int pondId){
        try {
            Fish fish = fishService.getFishByNameWithPondId(fishName, pondId);
            return ResponseEntity.ok(fish);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    /**
     * Update a Fish by ID.
     *
     * @param fishId the ID of the Fish to update
     * @param fish   the updated Fish
     * @return the ResponseEntity with status 200 (OK) and with body of the updated Fish,
     * or with status 404 (Not Found) if the Fish does not exist
     */
    @PutMapping
    public ResponseEntity<Fish> updateFish(@RequestParam(name = "fishId") int fishId, @RequestBody Fish fish) {
        try {
            Fish updatedFish = fishService.updateFish(fishId, fish);
            return ResponseEntity.ok(updatedFish);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (AlreadyExistedException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    /**
     * Delete a Fish by ID.
     *
     * @param fishId the ID of the Fish to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "Fish deleted successfully"
     */
    @DeleteMapping
    public ResponseEntity<String> deleteFish(@RequestParam(name = "fishId") int fishId) {
        try {
            fishService.deleteByID(fishId);
            return ResponseEntity.ok("Fish deleted successfully");
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/pond/{pondId}/count")
    public ResponseEntity<Integer> countFishInPond(@PathVariable int pondId) {
        int count = fishService.countFishInPond(pondId);
        return ResponseEntity.ok(count);
    }
}