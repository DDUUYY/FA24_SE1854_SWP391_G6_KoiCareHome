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
    public Breed saveBreed(Breed breed) {
        if(breedRepository.existsByName(breed.getBreedName())){
            throw new AlreadyExistedException(BREED_ALREADY_EXISTED_MESSAGE + "name: " + breed.getBreedName());
        }
        breed.setCreateBy("Admin");
        breed.setUpdateBy("Admin");
        return breedRepository.save(breed);
    }

    /**
     * Save a Breed by name.
     *
     * @param name the name of the entity to save
     * @return the persisted entity
     */
    public Breed saveBreedByName(String name) {
        if(breedRepository.existsByName(name))
        {
            throw new AlreadyExistedException(BREED_ALREADY_EXISTED_MESSAGE + "name: " + name);
        }
        Breed breed = new Breed();
        breed.setBreedName(name);
        breed.setCreateBy("Admin");
        breed.setUpdateBy("Admin");
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
    public Breed updateBreed(int id, Breed updatedBreed) {
        if (breedRepository.existsByNameExceptId(updatedBreed.getBreedName(), id))
            throw new AlreadyExistedException(BREED_ALREADY_EXISTED_MESSAGE + "name: " + updatedBreed.getBreedName());

        Breed existingBreedOpt = breedRepository.findById(id).orElseThrow(()
                -> new NotFoundException(BREED_NOT_FOUND_MESSAGE + "id: " + id));
        boolean flag = false;
        if (updatedBreed.getBreedName() != null) {
            existingBreedOpt.setBreedName(updatedBreed.getBreedName());
            flag = true;
        }
        if (updatedBreed.getDescription() != null) {
            existingBreedOpt.setDescription(updatedBreed.getDescription());
            flag = true;
        }
        if (updatedBreed.getOrigin() != null) {
            existingBreedOpt.setOrigin(updatedBreed.getOrigin());
            flag = true;
        }
        if (updatedBreed.getMinTemperature() != null) {
            existingBreedOpt.setMinTemperature(updatedBreed.getMinTemperature());
            flag = true;
        }
        if (updatedBreed.getMaxTemperature() != null) {
            existingBreedOpt.setMaxTemperature(updatedBreed.getMaxTemperature());
            flag = true;
        }
        if (updatedBreed.getMinPH() != null) {
            existingBreedOpt.setMinPH(updatedBreed.getMinPH());
            flag = true;
        }
        if (updatedBreed.getMaxPH() != null) {
            existingBreedOpt.setMaxPH(updatedBreed.getMaxPH());
            flag = true;
        }
        if (updatedBreed.getMinWaterHardness() != null) {
            existingBreedOpt.setMinWaterHardness(updatedBreed.getMinWaterHardness());
            flag = true;
        }
        if (updatedBreed.getMaxWaterHardness() != null) {
            existingBreedOpt.setMaxWaterHardness(updatedBreed.getMaxWaterHardness());
            flag = true;
        }
        if (updatedBreed.getFeedingInstructions() != null) {
            existingBreedOpt.setFeedingInstructions(updatedBreed.getFeedingInstructions());
            flag = true;
        }
        if (updatedBreed.getMinTankVolume() != null) {
            existingBreedOpt.setMinTankVolume(updatedBreed.getMinTankVolume());
            flag = true;
        }
        if(flag){
            existingBreedOpt.setUpdateBy("Admin");
            existingBreedOpt = breedRepository.save(existingBreedOpt);
        }
        return existingBreedOpt;
    }


    /**
     * Delete the Breed by ID.
     *
     * @param id the ID of the entity
     */
    @Transactional
    public void deleteByID(int id) {
        Breed deletedBreed = breedRepository.findById(id).orElseThrow(()
                -> new NotFoundException(BREED_NOT_FOUND_MESSAGE + " id: " + id));
        updateBreed(id, deletedBreed);
        breedRepository.deleteByID(id);
    }
}
