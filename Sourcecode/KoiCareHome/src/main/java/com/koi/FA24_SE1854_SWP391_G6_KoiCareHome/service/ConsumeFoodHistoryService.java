package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.AlreadyExistedException;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception.NotFoundException;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.ConsumeFoodHistory;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.ConsumeFoodHistoryRepository;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.FishRepository;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class ConsumeFoodHistoryService {
//
//    private static final String FISH_NOT_FOUND_MESSAGE = "Fish not found";
//
//    private final ConsumeFoodHistoryRepository consumeFoodHistoryRepository;
//    private final FishRepository fishRepository;
//
//    public ConsumeFoodHistoryService(ConsumeFoodHistoryRepository consumeFoodHistoryRepository, FishRepository fishRepository) {
//        this.consumeFoodHistoryRepository = consumeFoodHistoryRepository;
//        this.fishRepository = fishRepository;
//    }
//
//    /**
//     * Save a ConsumeFoodHistory of a Fish.
//     *
//     * @param consumeFoodHistory the entity to save
//     * @return the persisted entity
//     */
//    public ConsumeFoodHistory saveConsumeFoodHistory(ConsumeFoodHistory consumeFoodHistory) {
//        if(!fishRepository.existsById(consumeFoodHistory.getFishID()))
//        {
//            throw new AlreadyExistedException(FISH_NOT_FOUND_MESSAGE);
//        }
//        consumeFoodHistory.setCreateBy("user");
//        consumeFoodHistory.setUpdateBy("user");
//        return consumeFoodHistoryRepository.save(consumeFoodHistory);
//    }
//
//    /**
//     * Get all the ConsumeFoodHistory of a Fish.
//     *
//     * @return the list of entities
//     */
//    public List<ConsumeFoodHistory> findAllByFishID(int fishID) {
//        return consumeFoodHistoryRepository.findAllByFishID(fishID);
//    }
//
//    /**
//     * Get ConsumeFoodHistory by ID.
//     *
//     * @param id the ID of the entity
//     * @return the entity
//     */
//    public Optional<ConsumeFoodHistory> getConsumeFoodHistoryById(int id) {
//        Optional<ConsumeFoodHistory> existingFishType = fishTypeRepository.findById(id);
//        if (existingFishType.isPresent()) {
//            return existingFishType;
//        } else {
//            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
//        }
//    }
//
//    /**
//     * Get one FishType by name
//     *
//     * @param name the name of the entity
//     * @return the entity
//     */
//    public Optional<FishType> getFishTypeByName(String name) {
//        Optional<FishType> existingFishType = fishTypeRepository.findByName(name);
//        if (existingFishType.isPresent()) {
//            return existingFishType;
//        } else {
//            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
//        }
//    }
//
//    /**
//     * Update a FishType.
//     *
//     * @param id the ID of the entity
//     * @param updatedFishType the updated entity
//     * @return the updated entity
//     */
//    public FishType updateFishType(int id, FishType updatedFishType) {
//        Optional<FishType> existingFishType = fishTypeRepository.findById(id);
//        if (existingFishType.isPresent()) {
//            FishType fishType = existingFishType.get();
//            fishType.setName(updatedFishType.getName());
//            fishType.setUpdateBy("user");
//            return fishTypeRepository.save(fishType);
//        } else {
//            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
//        }
//    }
//
//    /**
//     * Delete the FishType by ID.
//     *
//     * @param id the ID of the entity
//     */
//    @Transactional
//    public void deleteByID(int id) {
//        if(fishTypeRepository.existsById(id)){
//            fishTypeRepository.deleteByID(id);
//        } else{
//            throw new NotFoundException(FISH_TYPE_NOT_FOUND_MESSAGE);
//        }
//
//    }
//}
