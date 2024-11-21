package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Breed;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.BreedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BreedService {

    private static final String BREED_NOT_FOUND_MESSAGE = "Breed is not found with ";
    private static final String BREED_ALREADY_EXISTED_MESSAGE = "Breed has already existed with ";

    private final BreedRepository breedRepository;

    @Autowired
    public BreedService(BreedRepository breedRepository) {
        this.breedRepository = breedRepository;
    }

    /**
     * Save a Breed.
     *
     * @param breed the entity to save
     * @return the persisted entity
     */
    public Breed saveBreed(Breed breed, int memberID) {
        if(breedRepository.existsByName(breed.getBreedName())){
            throw new AlreadyExistedException(BREED_ALREADY_EXISTED_MESSAGE + "name: " + breed.getBreedName());
        }
        breed.setCreateBy("Admin_" + memberID);
        breed.setUpdateBy("Admin_" + memberID);
        return breedRepository.save(breed);
    }

    /**
     * Save a Breed by name.
     *
     * @param name the name of the entity to save
     * @return the persisted entity
     */
    public Breed saveBreedByName(String name, int memberID) {
        if(breedRepository.existsByName(name))
        {
            throw new AlreadyExistedException(BREED_ALREADY_EXISTED_MESSAGE + "name: " + name);
        }
        Breed breed = new Breed();
        breed.setBreedName(name);
        breed.setCreateBy("Admin_" + memberID);
        breed.setUpdateBy("Admin_" + memberID);
        return breedRepository.save(breed);
    }

    /**
     * Get all the Breeds.
     *
     * @return the list of entities
     */
    public List<Breed> getAllBreeds() {
        return breedRepository.findAllBreeds();
    }

    /**
     * Get one Breed by ID.
     *
     * @param id the ID of the entity
     * @return the entity
     */
    public Breed getBreedByID(int id) {
        return breedRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(BREED_NOT_FOUND_MESSAGE + "id: " + id));
    }

    /**
     * Get one Breed by name
     *
     * @param name the name of the entity
     * @return the entity
     */
    public Breed getBreedByName(String name) {
        return breedRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException(BREED_NOT_FOUND_MESSAGE + "name: " + name));
    }

    /**
     * Update a Breed.
     *
     * @param id the ID of the entity
     * @param updatedBreed the updated entity
     * @return the updated entity
     */
    public Breed updateBreed(int id, Breed updatedBreed, int memberID) {
        if (breedRepository.existsByNameExceptId(updatedBreed.getBreedName(), id))
            throw new AlreadyExistedException(BREED_ALREADY_EXISTED_MESSAGE + "name: " + updatedBreed.getBreedName());

        Breed existingBreedOpt = breedRepository.findById(id).orElseThrow(()
                -> new NotFoundException(BREED_NOT_FOUND_MESSAGE + "id: " + id));
        Optional.of(updatedBreed.getBreedName()).ifPresent(existingBreedOpt::setBreedName);
        Optional.ofNullable(updatedBreed.getDescription()).ifPresent(existingBreedOpt::setDescription);
        Optional.ofNullable(updatedBreed.getOrigin()).ifPresent(existingBreedOpt::setOrigin);
        Optional.ofNullable(updatedBreed.getMinTemperature()).ifPresent(existingBreedOpt::setMinTemperature);
        Optional.ofNullable(updatedBreed.getMaxTemperature()).ifPresent(existingBreedOpt::setMaxTemperature);
        Optional.ofNullable(updatedBreed.getMinPH()).ifPresent(existingBreedOpt::setMinPH);
        Optional.ofNullable(updatedBreed.getMaxPH()).ifPresent(existingBreedOpt::setMaxPH);
        Optional.ofNullable(updatedBreed.getMinWaterHardness()).ifPresent(existingBreedOpt::setMinWaterHardness);
        Optional.ofNullable(updatedBreed.getMaxWaterHardness()).ifPresent(existingBreedOpt::setMaxWaterHardness);
        Optional.of(updatedBreed.getFeedingInstructions()).ifPresent(existingBreedOpt::setFeedingInstructions);
        Optional.of(updatedBreed.getMinTankVolume()).ifPresent(existingBreedOpt::setMinTankVolume);
        return existingBreedOpt;
    }


    /**
     * Delete the Breed by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id, int memberID) {
        Breed deletedBreed = breedRepository.findById(id).orElseThrow(()
                -> new NotFoundException(BREED_NOT_FOUND_MESSAGE + " id: " + id));
        updateBreed(id, deletedBreed, memberID);
        breedRepository.deleteByID(id);
    }
}