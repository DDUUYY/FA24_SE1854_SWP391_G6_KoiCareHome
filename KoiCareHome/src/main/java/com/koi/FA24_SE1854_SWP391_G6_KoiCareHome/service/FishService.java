package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FishService {

    private static final String FISH_NOT_FOUND_MESSAGE = "Fish not found.";
    private static final String FISH_TYPE_NOT_FOUND_MESSAGE = "Fish type not found.";
    private static final String FISH_ALREADY_EXISTED_MESSAGE = "Fish already existed.";

    private final FishRepository fishRepository;

    @Autowired
    public FishService(FishRepository fishRepository) {
        this.fishRepository = fishRepository;
    }

    /**
     * Save a Fish.
     *
     * @param fish the entity to save
     * @return the persisted entity
     */
    public Fish saveFish(Fish fish) {
        if(fishRepository.existsByNameExceptId(fish.getName(), fish.getFishID())){
            throw new AlreadyExistedException(FISH_ALREADY_EXISTED_MESSAGE);
        }
        return fishRepository.save(fish);
    }

    /**
     * Get all the Fishes.
     *
     * @return the list of entities
     */
    public List<Fish> getAllFishes() {
        return fishRepository.findAll();
    }

    /**
     * Get one Fish by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Optional<Fish> getFishById(int id) {
        return fishRepository.findById(id);
    }

    /**
     * Update a Fish.
     *
     * @param id the ID of the entity
     * @param updatedFish the updated entity
     * @return the updated entity
     */
    public Fish updateFish(int id, Fish updatedFish) {
        Optional<Fish> existingFish = fishRepository.findById(id);
        if (existingFish.isPresent()) {
            Fish fish = existingFish.get();
            fish.setName(updatedFish.getName());
            fish.setSize(updatedFish.getSize());
            fish.setWeight(updatedFish.getWeight());
            fish.setAge(updatedFish.getAge());
            fish.setGender(updatedFish.getGender());
            fish.setBreed(updatedFish.getBreed());
            fish.setOrigin(updatedFish.getOrigin());
            fish.setPrice(updatedFish.getPrice());
            return fishRepository.save(fish);
        } else {
            throw new RuntimeException(FISH_NOT_FOUND_MESSAGE);
        }
    }

    /**
     * Delete the Fish by ID.
     *
     * @param id the ID of the entity
     */
    public void deleteFish(int id) {
        fishRepository.deleteById(id);
    }
}