package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthRecord;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.GrowthRecordRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

/**
 * @author Ha Huy Nghia Hiep
 */

@Service
@RequiredArgsConstructor
public class GrowthRecordService {
    private final GrowthRecordRepository growthRecordRepository;
    private final FishService fishService;

    public GrowthRecord postGrowthRecord(GrowthRecord growthRecord) {
        growthRecord.setIsActive(true);
        GrowthRecord savedRecord = growthRecordRepository.save(growthRecord);

        Fish fishUpdate = new Fish();
        fishUpdate.setSize(growthRecord.getSize());
        fishUpdate.setWeight(growthRecord.getWeight());

        fishService.updateFish(growthRecord.getFishID(), fishUpdate);

        return savedRecord;
    }


    public List<GrowthRecord> getAllGrowthRecords() {
        return growthRecordRepository.findAll();
    }

   public void deleteGrowthRecord(Integer RecordID) {
      if(!growthRecordRepository.existsById(RecordID)) {
throw new EntityNotFoundException("Record with the ID: " + RecordID + " not found");
      }
      growthRecordRepository.deleteById(RecordID);
   }

   public GrowthRecord getGrowthRecordById(Integer RecordID) {
      return growthRecordRepository.findById(RecordID).orElse(null);
   }

   public GrowthRecord updateGrowthRecord(Integer RecordID,GrowthRecord growthRecord) {
       Optional<GrowthRecord> OptionalGrowthRecord = growthRecordRepository.findById(RecordID);
       if (OptionalGrowthRecord.isPresent()) {
           GrowthRecord existingGrowthRecord = OptionalGrowthRecord.get();
          // existingGrowthRecord.setMeasurementDate(LocalDate.now());
           existingGrowthRecord.setSize(growthRecord.getSize());
           existingGrowthRecord.setWeight(growthRecord.getWeight());
           existingGrowthRecord.setDescription(growthRecord.getDescription());
           return growthRecordRepository.save(existingGrowthRecord);
       }
     return null;
   }

    public List<GrowthRecord> getGrowthRecordsByFishId(Integer fishID) {
        return growthRecordRepository.findByFishIDAndIsActiveTrue(fishID);
    }
}

