package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FishService {

    private static final String FISH_NOT_FOUND_MESSAGE = "Fish not found.";
    private static final String FISH_NAME_ALREADY_EXISTED_MESSAGE = "Fish name already existed.";

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
         if (fishRepository.existsByNameAndPondIdExceptId(fish.getName(),fish.getFishID(), fish.getPondID())) {
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE);
         }
         fish.setFishTypeID(fishTypeRepository.findByName("KoiFish").get().getFishTypeID());
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
     * Get all the Fishes in a specific pond.
     *
     * @return the list of entities
     */
    public List<Fish> getAllFishesWithPondId(int pondId) {
        return fishRepository.findAllFishWithPondId(pondId);
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
     * Get one Fish by Name.
     *
     * @param fishName the name of the Fish entity
     * @param pondId the id of the Fish's pond
     * @return the entity
     */
    public Optional<Fish> getFishByNameWithPondId(String fishName, int pondId) {
        return fishRepository.findFishByNameWithPondID(fishName, pondId);
    }

    /**
     * Update a Fish.
     *
     * @param id the ID of the entity
     * @param updatedFish the updated entity
     * @return the updated entity
     */
    public Fish updateFish(int id, Fish updatedFish) {
        Optional<Fish> existingFish = fishRepository.findFishById(id);
        if (existingFish.isEmpty()) {
           throw new NotFoundException(FISH_NOT_FOUND_MESSAGE);
        }
        Fish fish = existingFish.get();
        if (fishRepository.existsByNameAndPondIdExceptId(updatedFish.getName(),id, updatedFish.getPondID())) {
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE);
        }
        fish.setName(updatedFish.getName());
        fish.setSize(updatedFish.getSize());
        fish.setWeight(updatedFish.getWeight());
        fish.setAge(updatedFish.getAge());
        fish.setGender(updatedFish.getGender());
        fish.setBreed(updatedFish.getBreed());
        fish.setOrigin(updatedFish.getOrigin());
        fish.setPrice(updatedFish.getPrice());
        fish.setUpdateBy("user");
        return fishRepository.save(fish);
    }

    /**
     * Delete a Fish by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        if(fishRepository.existsById(id)){
            updateFish(id, fishRepository.findById(id).get());
            fishRepository.deleteByID(id);
        } else{
            throw new NotFoundException(FISH_NOT_FOUND_MESSAGE);
        }

    }
}