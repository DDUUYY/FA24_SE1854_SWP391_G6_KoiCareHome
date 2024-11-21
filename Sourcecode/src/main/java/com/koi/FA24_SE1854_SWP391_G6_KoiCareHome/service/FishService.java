package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class FishService {

    private static final String MEMBER_NOT_FOUND_MESSAGE = "Member is not found with id: ";
    private static final String FISH_NOT_FOUND_MESSAGE = "Fish is not found ";
    private static final String POND_NOT_FOUND_MESSAGE = "Pond is not found with id: ";
    private static final String FISH_NAME_ALREADY_EXISTED_MESSAGE = "Fish name has already existed in pond ID: ";

    private final FishRepository fishRepository;
    private final FishTypeRepository fishTypeRepository;
    private final MemberRepository memberRepository;
    private final PondRepository pondRepository;
    private final FishTypeService fishTypeService;
    private final FoodRepository foodRepository;


    @Autowired
    public FishService(FishRepository fishRepository, FishTypeRepository fishTypeRepository, FishTypeService fishTypeService,
                       MemberRepository memberRepository, PondRepository pondRepository, FoodRepository foodRepository) {
        this.fishRepository = fishRepository;
        this.fishTypeRepository = fishTypeRepository;
        this.memberRepository = memberRepository;
        this.pondRepository = pondRepository;
        this.fishTypeService = fishTypeService;
        this.foodRepository = foodRepository;
    }

    /**
     * Save a Fish.
     *
     * @param fish the entity to save
     * @return the persisted entity
     */
    public Fish saveFish(Fish fish) {
        if (fishRepository.existsByNameAndPondIdExceptId(fish.getName(), fish.getFishID(), fish.getPondID())) {
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE + fish.getPondID());
        } else if (!fishRepository.existsMemberId(fish.getMemberID())) {
            throw new NotFoundException(MEMBER_NOT_FOUND_MESSAGE + fish.getMemberID());
        }

        Optional<FishType> fishType = fishTypeRepository.findByName("KoiFish");
        if (fishType.isEmpty()) {
            fishTypeService.saveFishTypeByName("KoiFish");
            fishType = fishTypeRepository.findByName("KoiFish");
        }

        FishType newFishType = fishType.get();
        fish.setFishTypeID(newFishType.getFishTypeID());
        fish.setCreateBy("Member");
        fish.setUpdateBy("Member");

        return fishRepository.save(fish);
    }

    /**
     * Get all the Fishes.
     *
     * @return the list of entities
     */
    public List<Fish> getAllFishes() {
        List<Fish> fishes = fishRepository.findAllFish();
        for (Fish fish : fishes) {
            fish.countAgeMonth();
            fishRepository.save(fish);
        }
        return fishes;
    }

    /**
     * Get all the Fishes in a specific pond.
     *
     * @return the list of entities
     */
    public List<Fish> getAllFishesWithPondId(int pondId) {
        List<Fish> fishes = fishRepository.findAllFishWithPondId(pondId);
        for (Fish fish : fishes) {
            fish.countAgeMonth();
            fishRepository.save(fish);
        }
        return fishRepository.findAllFishWithPondId(pondId);
    }

    /**
     * Get all the Fishes under Member id.
     *
     * @return the list of entities
     */
    public List<Fish> getAllFishWithMemberId(int memberId) {
        List<Fish> fishes = fishRepository.findAllFishWithMemberId(memberId);
        for (Fish fish : fishes) {
            fish.countAgeMonth();
            fishRepository.save(fish);
        }
        return fishRepository.findAllFishWithMemberId(memberId);
    }

    /**
     * Get one Fish by ID.
     *
     * @param fishId the ID of the entity
     * @return the entity
     */
    public Fish getFishById(int fishId) {
        return fishRepository.findById(fishId)
                .orElseThrow(() -> new NotFoundException(FISH_NOT_FOUND_MESSAGE + "with id: " + fishId));
    }


    /**
     * Get one Fish by Name.
     *
     * @param fishName the name of the Fish entity
     * @param pondId   the id of the Fish's pond
     * @return the entity
     */
    public Fish getFishByNameWithPondId(String fishName, int pondId) {
        return fishRepository.findFishByNameWithPondID(fishName, pondId).orElseThrow(()
                -> new NotFoundException(FISH_NOT_FOUND_MESSAGE + "in pond id: " + pondId + " with name: " + fishName));
    }

    /**
     * Update a Fish.
     *
     * @param id          the ID of the entity
     * @param updatedFish the updated entity
     * @return the updated entity
     */
    public Fish updateFish(int id, Fish updatedFish) {
        if (updatedFish.getMemberID() != 0 && !memberRepository.existsById(updatedFish.getMemberID()))
            throw new NotFoundException(MEMBER_NOT_FOUND_MESSAGE + updatedFish.getMemberID());

        if ((updatedFish.getPondID()!= 0) && !pondRepository.existsByIdAndMemberId(updatedFish.getPondID(), updatedFish.getMemberID()))
            throw new NotFoundException(POND_NOT_FOUND_MESSAGE + updatedFish.getPondID());

        if (fishRepository.existsByNameAndPondIdExceptId(updatedFish.getName(), updatedFish.getPondID(), id))
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE + updatedFish.getPondID());

        Fish existingFishOpt = fishRepository.findFishById(id).orElseThrow(()
                -> new NotFoundException(FISH_NOT_FOUND_MESSAGE + "with id: " + id));
        boolean flag = false;
        if (updatedFish.getPondID() != 0) {
            existingFishOpt.setPondID(updatedFish.getPondID());
            flag = true;
        }
        if (updatedFish.getName() != null) {
            existingFishOpt.setName(updatedFish.getName());
            flag = true;
        }
        if (updatedFish.getSize().compareTo(BigDecimal.ZERO) != 0) {
            existingFishOpt.setSize(updatedFish.getSize());
            flag = true;
        }
        if (updatedFish.getAgeMonth() != 0) {
            existingFishOpt.setAgeMonth(updatedFish.getAgeMonth());
            flag = true;
        }
        if (updatedFish.getGender() != null) {
            existingFishOpt.setGender(updatedFish.getGender());
            flag = true;
        }
        if (updatedFish.getBreedID() != 0) {
            existingFishOpt.setBreedID(updatedFish.getBreedID());
            flag = true;
        }
        if(flag){
            existingFishOpt.setUpdateBy("Member");
            existingFishOpt = fishRepository.save(existingFishOpt);
        }
        existingFishOpt.countAgeMonth();
        return existingFishOpt;
    }

    /**
     * Delete a Fish by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        Fish deletedFish = fishRepository.findFishById(id).orElseThrow(()
                -> new NotFoundException(FISH_NOT_FOUND_MESSAGE + "with id: " + id));
        updateFish(id, deletedFish);
        fishRepository.deleteByID(id);
    }

    public int countFishInPond(int pondId) {
        return fishRepository.findAllFishWithPondId(pondId).size();
    }
}