package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Breed;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.BreedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Quach To Anh
 */
@RestController
@RequestMapping("/api/breed")
@CrossOrigin(origins = "http://localhost:5173")
public class BreedController {
    private final BreedService breedService;

    @Autowired
    public BreedController(BreedService breedService) {
        this.breedService = breedService;
    }

    /**
     * Create a new Breed.
     *
     * @param breed the Breed to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new Breed
     */
    @PostMapping
    public ResponseEntity<Breed> saveBreed(@RequestBody Breed breed) {
        Breed newBreed = breedService.saveBreed(breed);
        return ResponseEntity.ok(newBreed);
    }


    /**
     * Get all Breeds.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of Breeds
     */
    @GetMapping
    public List<Breed> getAllBreeds() {
        return breedService.getAllBreeds();
    }

    /**
     * Get a Breed by ID.
     *
     * @param id the ID of the Breed to get
     * @return the ResponseEntity with status 200 (OK) and with body of the Breed,
     * or with status 404 (Not Found) if the Breed does not exist
     */
    @GetMapping("/{id}")
    public ResponseEntity<Breed> getBreedById(@PathVariable int id) {
        try {
            Breed breed = breedService.getBreedByID(id);
            return ResponseEntity.ok(breed);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Get a Breed by Name
     *
     * @param name the Name of the Breed to get
     * @return the ResponseEntity with status 200 (OK) and with body of the Breed,
     * or with the status 404 (NotFound) if the Breed does not exist
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<Breed> getBreedByName(@PathVariable String name) {
        try {
            Breed breed = breedService.getBreedByName(name);
            return ResponseEntity.ok(breed);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Update a Breed by ID.
     *
     * @param id the ID of the Breed to update
     * @param breed the updated Breed
     * @return the ResponseEntity with status 200 (OK) and with body of the updated Breed,
     * or with status 404 (Not Found) if the Breed does not exist
     */
    @PutMapping
    public ResponseEntity<Breed> updateBreed(@RequestParam(name = "breedId") int id, @RequestBody Breed breed) {
        try {
            Breed updatedBreed = breedService.updateBreed(id, breed);
            return ResponseEntity.ok(updatedBreed);
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (AlreadyExistedException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    /**
     * Delete a Breed by ID.
     *
     * @param id the ID of the Breed to delete
     * @return the ResponseEntity with status 200 (OK) and with body of the message "Breed deleted successfully"
     */
    @DeleteMapping
    public ResponseEntity<String> deleteByID(@RequestParam(name = "breedId") int id) {
        try {
            breedService.deleteByID(id);
            return ResponseEntity.ok("Breed deleted successfully");
        } catch (NotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}