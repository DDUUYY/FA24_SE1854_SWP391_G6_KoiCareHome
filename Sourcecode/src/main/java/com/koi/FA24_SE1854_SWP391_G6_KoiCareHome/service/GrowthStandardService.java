package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthStandard;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.BreedRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.GrowthStandardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GrowthStandardService {

    private static final String GROWTH_STANDARD_NOT_FOUND_MESSAGE = "Growth standard is not found with ";
    private static final String GROWTH_STANDARD_ALREADY_EXISTED_MESSAGE = "Growth standard has already existed with ";
    private static final String BREED_NOT_FOUND_MESSAGE = "Breed is not found with ";

    private final GrowthStandardRepository growthStandardRepository;
    private final BreedRepository breedRepository;

    @Autowired
    public GrowthStandardService(GrowthStandardRepository growthStandardRepository, BreedRepository breedRepository) {
        this.growthStandardRepository = growthStandardRepository;
        this.breedRepository = breedRepository;
    }

    /**
     * Save a GrowthStandard.
     *
     * @param growthStandard the entity to save
     * @return the persisted entity
     */
    public GrowthStandard saveGrowthStandard(GrowthStandard growthStandard, int memberID) {
        if(!breedRepository.existsById(growthStandard.getBreedID()) || growthStandard.getBreedID() == 0) {
            throw new NotFoundException(BREED_NOT_FOUND_MESSAGE + growthStandard.getBreedID());
        }
        if(growthStandardRepository.existsByBreedIdAndAgeMonthExceptId(growthStandard.getBreedID(),
                growthStandard.getAgeMonths(), growthStandard.getGrowthStandardID())) {
            throw new AlreadyExistedException(GROWTH_STANDARD_ALREADY_EXISTED_MESSAGE + growthStandard.getAgeMonths()
                    + " in breed id: " + growthStandard.getBreedID());
        }
        growthStandard.setCreateBy("Admin_" + memberID);
        growthStandard.setUpdateBy("Admin_" + memberID);
        return growthStandardRepository.save(growthStandard);
    }

    /**
     * Get all the GrowthStandards.
     *
     * @return the list of entities
     */
    public List<GrowthStandard> getAllGrowthStandards() {
        return growthStandardRepository.findAllGrowthStandards();
    }

    /**
     * Get all the GrowthStandards by BreedID.
     *
     * @param breedID id of breed of this growth standard
     * @return the list of entities that has BreedID equal to breedID
     */
    public List<GrowthStandard> getAllGrowthStandardsByBreedId(int breedID) {
        return growthStandardRepository.findAllGrowthStandardsByBreedId(breedID);
    }

    /**
     * Get one GrowthStandard by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public GrowthStandard getGrowthStandardByID(int id) {
        return growthStandardRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(GROWTH_STANDARD_NOT_FOUND_MESSAGE + "id: " + id));
    }

    /**
     * Update a GrowthStandard.
     *
     * @param id the ID of the entity
     * @param updatedGrowthStandard the updated entity
     * @return the updated entity
     */
    public GrowthStandard updateGrowthStandard(int id, GrowthStandard updatedGrowthStandard, int memberID) {
        if(!breedRepository.existsById(updatedGrowthStandard.getBreedID())) {
            throw new NotFoundException(BREED_NOT_FOUND_MESSAGE + "id: " + updatedGrowthStandard.getBreedID());
        }
        if(growthStandardRepository.existsByBreedIdAndAgeMonthExceptId(updatedGrowthStandard.getBreedID(),
                updatedGrowthStandard.getAgeMonths(), updatedGrowthStandard.getGrowthStandardID())) {
            throw new AlreadyExistedException(GROWTH_STANDARD_ALREADY_EXISTED_MESSAGE + updatedGrowthStandard.getAgeMonths()
                    + " in breed id: " + updatedGrowthStandard.getBreedID());
        }
        GrowthStandard existingGrowthStandardOpt = growthStandardRepository.findById(id).orElseThrow(()
                -> new NotFoundException(GROWTH_STANDARD_NOT_FOUND_MESSAGE + "id: " + id));
        Optional.of(updatedGrowthStandard.getBreedID()).ifPresent(existingGrowthStandardOpt::setBreedID);
        Optional.of(updatedGrowthStandard.getAgeMonths()).ifPresent(existingGrowthStandardOpt::setAgeMonths);
        Optional.ofNullable(updatedGrowthStandard.getExpectedWeight()).ifPresent(existingGrowthStandardOpt::setExpectedWeight);
        Optional.ofNullable(updatedGrowthStandard.getExpectedSize()).ifPresent(existingGrowthStandardOpt::setExpectedSize);
        return existingGrowthStandardOpt;
    }


    /**
     * Delete the GrowthStandard by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id, int memberID) {
        GrowthStandard deletedGrowthStandard = growthStandardRepository.findById(id).orElseThrow(()
                -> new NotFoundException(GROWTH_STANDARD_NOT_FOUND_MESSAGE + " id: " + id));
        updateGrowthStandard(id, deletedGrowthStandard, memberID);
        growthStandardRepository.deleteByID(id);
    }
}