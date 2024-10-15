package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FishService {

    private static final String FISH_NOT_FOUND_MESSAGE = "Fish not found.";
    private static final String FISH_TYPE_NOT_FOUND_MESSAGE = "Fish type not found.";
    private static final String FISH_ALREADY_EXISTED_MESSAGE = "Fish already existed.";
    private static final String FISH_TYPE_ALREADY_EXISTED_MESSAGE = "Fish type already existed.";

    private final FishRepository fishRepository;
    private final FishTypeRepository fishTypeRepository;

    @Autowired
    public FishService(FishRepository fishRepository, FishTypeRepository fishTypeRepository) {
        this.fishRepository = fishRepository;
        this.fishTypeRepository = fishTypeRepository;
    }

    /**
     * Save a Fish.
     *
     * @param fish the entity to save
     * @return the persisted entity
     */
    public Fish saveFish(Fish fish) {
        Optional<FishType> fishType = fishTypeRepository.findById(fish.getFishTypeID());
        if(fishType.isEmpty())
        {
            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
        } else if (fishRepository.existsById(fish.getFishID())) {
            throw new AlreadyExistedException(FISH_ALREADY_EXISTED_MESSAGE);
        }
        fish.setCreateBy("user");
        fish.setUpdateBy("user");
        return fishRepository.save(fish);
    }

    /**
     * Get all the Fishes.
     *
     * @return the list of entities
     */
    public List<Fish> getAllFishes() {
        return fishRepository.findAllFish();
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
        if (existingFish.isEmpty()) {
           throw new RuntimeException(FISH_NOT_FOUND_MESSAGE);
        }
        Fish fish = existingFish.get();
        fish.setName(updatedFish.getName());
        fish.setSize(updatedFish.getSize());
        fish.setWeight(updatedFish.getWeight());
        fish.setAge(updatedFish.getAge());
        fish.setGender(updatedFish.getGender());
        fish.setBreed(updatedFish.getBreed());
        fish.setOrigin(updatedFish.getOrigin());
        fish.setPrice(updatedFish.getPrice());
        if(!fishTypeRepository.existsById(updatedFish.getFishTypeID())){
            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
        }
        fish.setFishTypeID(updatedFish.getFishTypeID());
        return fishRepository.save(fish);
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