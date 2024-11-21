package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Breed;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthStandard;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.GrowthStandardService;
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
@RequestMapping("/api/growthStandard")
@CrossOrigin(origins = "http://localhost:5173")
public class GrowthStandardController {
    private final GrowthStandardService growthStandardService;

    @Autowired
    public GrowthStandardController(GrowthStandardService growthStandardService) {
        this.growthStandardService = growthStandardService;
    }

    /**
     * Create a new GrowthStandard.
     *
     * @param growthStandard the GrowthStandard to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new GrowthStandard
     */
    @PostMapping
    public ResponseEntity<GrowthStandard> saveGrowthStandard(@RequestBody GrowthStandard growthStandard,
                                                             @RequestParam(name = "memberId") int memberID) {
        try {
            GrowthStandard newGrowthStandard = growthStandardService.saveGrowthStandard(growthStandard, memberID);
            return ResponseEntity.ok(newGrowthStandard);
        } catch (AlreadyExistedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Get all GrowthStandards.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of GrowthStandards
     */
    @GetMapping
    public List<GrowthStandard> getAllGrowthStandards() {
        return growthStandardService.getAllGrowthStandards();
    }

    /**
     * Get all GrowthStandards by BreedID.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of GrowthStandards that has the same breedID
     */
    @GetMapping("/breed")
    public List<GrowthStandard> getAllGrowthStandardsByBreedId(@RequestParam(name = "breedId") int id) {
        return growthStandardService.getAllGrowthStandardsByBreedId(id);
    }

    /**
     * Get a GrowthStandard by ID.
     *
     * @param id the ID of the GrowthStandard to get
     * @return the ResponseEntity with status 200 (OK) and with body of the GrowthStandard,
     * or with status 404 (Not Found) if the GrowthStandard does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<GrowthStandard> getGrowthStandardById(@PathVariable int id) {
        try {
            GrowthStandard growthStandard = growthStandardService.getGrowthStandardByID(id);
            return ResponseEntity.ok(growthStandard);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Update a GrowthStandard by ID.
     *
     * @param id the ID of the GrowthStandard to update
     * @param growthStandard the updated GrowthStandard
     * @return the ResponseEntity with status 200 (OK) and with body of the updated GrowthStandard,
     * or with status 404 (Not Found) if the GrowthStandard does not exist
     */
    @PutMapping
    public ResponseEntity<GrowthStandard> updateGrowthStandard(@RequestParam(name = "growthStandardId") int id,
                                                               @RequestBody GrowthStandard growthStandard,
                                                               @RequestParam(name = "memberId") int memberID) {
        try {
            GrowthStandard updatedGrowthStandard = growthStandardService.updateGrowthStandard(id, growthStandard, memberID);
            return ResponseEntity.ok(updatedGrowthStandard);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (AlreadyExistedException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    /**
     * Delete a GrowthStandard by ID.
     *
     * @param id the ID of the GrowthStandard to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "GrowthStandard deleted successfully"
     */
    @DeleteMapping
    public ResponseEntity<String> deleteByID(@RequestParam(name = "growthStandardId") int id,
                                             @RequestParam(name = "memberId") int memberID) {
        try {
            growthStandardService.deleteByID(id, memberID);
            return ResponseEntity.ok("GrowthStandard deleted successfully");
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}