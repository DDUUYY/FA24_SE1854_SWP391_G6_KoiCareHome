package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.IllegalArgumentException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.*;
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
    private static final String POND_NOT_SUITABLE_MESSAGE = "This pond is too small for this fish";
    private static final String VALUE_NOT_SUITABLE_MESSAGE = "This fish can't have that value of size/pond/ageMonth";

    private final FishRepository fishRepository;
    private final FishTypeRepository fishTypeRepository;
    private final MemberRepository memberRepository;
    private final PondRepository pondRepository;
    private final FishTypeService fishTypeService;
    private final BreedRepository breedRepository;


    @Autowired
    public FishService(FishRepository fishRepository, FishTypeRepository fishTypeRepository, FishTypeService fishTypeService,
                       MemberRepository memberRepository, PondRepository pondRepository, BreedRepository breedRepository) {
        this.fishRepository = fishRepository;
        this.fishTypeRepository = fishTypeRepository;
        this.memberRepository = memberRepository;
        this.pondRepository = pondRepository;
        this.fishTypeService = fishTypeService;
        this.breedRepository = breedRepository;
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

        checkValidPond(fish);
        checkFishValidation(fish);
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

    private void checkValidPond(Fish fish) {
        Breed breed = breedRepository.findById(fish.getBreedID()).get();
        Pond pond = pondRepository.findById(fish.getBreedID()).get();
        if (breed.getMinTankVolume().compareTo(pond.getVolume()) < 0)
            throw new IllegalArgumentException(POND_NOT_SUITABLE_MESSAGE);
    }

    private void checkFishValidation(Fish fish) {
        Breed breed = breedRepository.findById(fish.getBreedID()).get();
        if (fish.getSize().compareTo(breed.getMinSize()) < 0 || fish.getSize().compareTo(breed.getMaxSize()) > 0)
            throw new IllegalArgumentException("Size of this Koi breed must between " + breed.getMinSize() + " and " + breed.getMaxSize() + "(cm)");
        else if (fish.getWeight().compareTo(breed.getMinWeight()) < 0 || fish.getWeight().compareTo(breed.getMaxWeight()) > 0) {
            throw new IllegalArgumentException("Weight of this Koi breed must between " + breed.getMinWeight() + " and " + breed.getMaxWeight() + "(kg)");
        } else if (fish.getAgeMonth() > breed.getMaxAgeMonth()) {
            throw new IllegalArgumentException("This breed can only live up to " + breed.getMaxAgeMonth());
        }
    }

//    private String fishStage(Fish fish) {
//        if (fish.getAgeMonth() >= 0 && fish.getAgeMonth() < 2) {
//            return "Fry";
//        } else if (fish.getAgeMonth() >= 2 && fish.getAgeMonth() < 6) {
//            return "Fingerling";
//        } else if (fish.getAgeMonth() >= 6 && fish.getAgeMonth() < 12) {
//            return "Juvenile";
//        } else if (fish.getAgeMonth() >= 12 && fish.getAgeMonth() < 24) {
//            return "Early Maturity";
//        } else if (fish.getAgeMonth() >= 24 && fish.getAgeMonth() < 36) {
//            return "Adult";
//        }
//        return "Senior";
//    }

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
        if (updatedFish.getMemberID() != 0 && !memberRepository.existsById(updatedFish.getMemberID())) {
            throw new NotFoundException(MEMBER_NOT_FOUND_MESSAGE + updatedFish.getMemberID());
        } else if ((updatedFish.getPondID() != 0) && !pondRepository.existsByIdAndMemberId(updatedFish.getPondID(), updatedFish.getMemberID())) {
            throw new NotFoundException(POND_NOT_FOUND_MESSAGE + updatedFish.getPondID());
        } else if (fishRepository.existsByNameAndPondIdExceptId(updatedFish.getName(), updatedFish.getPondID(), updatedFish.getFishID())) {
            throw new AlreadyExistedException(FISH_NAME_ALREADY_EXISTED_MESSAGE + updatedFish.getPondID());
        }

        checkValidPond(updatedFish);
        checkFishValidation(updatedFish);

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
        if (updatedFish.getBirthday() != null) {
            existingFishOpt.setBirthday(updatedFish.getBirthday());
            existingFishOpt.countAgeMonth(); // Update ageMonth based on new birthday
        }
        if (updatedFish.getGender() != null) {
            existingFishOpt.setGender(updatedFish.getGender());
            flag = true;
        }
        if (updatedFish.getBreedID() != 0) {
            existingFishOpt.setBreedID(updatedFish.getBreedID());
            flag = true;
        }
        if (flag) {
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