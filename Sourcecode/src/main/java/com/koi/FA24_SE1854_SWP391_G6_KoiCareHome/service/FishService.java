package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Fish saveFish(Fish fish, int memberID) {
        if (fishRepository.existsByNameAndPondIdExceptId(fish.getName(), fish.getFishID(), fish.getPondID())) {
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE + fish.getPondID());
        } else if (!fishRepository.existsMemberId(fish.getMemberID())) {
            throw new NotFoundException(MEMBER_NOT_FOUND_MESSAGE);
        }

        Optional<FishType> fishType = fishTypeRepository.findByName("KoiFish");
        if (fishType.isEmpty()) {
            fishTypeService.saveFishTypeByName("KoiFish");
            fishType = fishTypeRepository.findByName("KoiFish");
        }

        FishType newFishType = fishType.get();
        fish.setFishTypeID(newFishType.getFishTypeID());
        fish.setCreateBy("Member_" + memberID);
        fish.setUpdateBy("Member_" + memberID);

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
    public Fish updateFish(int id, Fish updatedFish, int memberId) {
        if (updatedFish.getMemberID()!=0 && ! memberRepository.existsById(updatedFish.getMemberID()))
            throw new NotFoundException(MEMBER_NOT_FOUND_MESSAGE + memberId);

        if ((updatedFish.getPondID()!= 0) && !pondRepository.existsByIdAndMemberId(updatedFish.getPondID(), updatedFish.getMemberID()))
            throw new NotFoundException(POND_NOT_FOUND_MESSAGE + updatedFish.getPondID());

        if (fishRepository.existsByNameAndPondIdExceptId(updatedFish.getName(), updatedFish.getPondID(), id))
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE + updatedFish.getPondID());

        Fish existingFishOpt = fishRepository.findFishById(id).orElseThrow(()
                -> new NotFoundException(FISH_NOT_FOUND_MESSAGE + "with id: " + id));
        Optional.of(updatedFish.getPondID()).ifPresent(existingFishOpt::setPondID);
        Optional.ofNullable(updatedFish.getName()).ifPresent(existingFishOpt::setName);
        Optional.ofNullable(updatedFish.getSize()).ifPresent(existingFishOpt::setSize);
        Optional.ofNullable(updatedFish.getAgeMonth()).ifPresent(existingFishOpt::setAgeMonth);
        Optional.ofNullable(updatedFish.getGender()).ifPresent(existingFishOpt::setGender);
        Optional.of(updatedFish.getBreedID()).ifPresent(existingFishOpt::setBreedID);
        existingFishOpt.countAgeMonth();
        return existingFishOpt;
    }

    /**
     * Delete a Fish by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id, int memberID) {
        Fish deletedFish = fishRepository.findFishById(id).orElseThrow(()
                -> new NotFoundException(FISH_NOT_FOUND_MESSAGE + "with id: " + id));
        updateFish(id, deletedFish, memberID);
        fishRepository.deleteByID(id);
    }
}