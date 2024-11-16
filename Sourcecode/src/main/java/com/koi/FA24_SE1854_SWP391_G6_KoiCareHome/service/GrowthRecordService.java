package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthRecord;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.GrowthRecordRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
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

    private static final BigDecimal MAX_SIZE_GROWTH_PER_DAY = BigDecimal.valueOf(1.0); // 1 cm per day
    private static final BigDecimal MAX_WEIGHT_GROWTH_PERCENT_PER_DAY = BigDecimal.valueOf(0.04); // 4%
    private static final BigDecimal MIN_WEIGHT_SIZE_RATIO = BigDecimal.valueOf(0.055);
    private static final BigDecimal MAX_WEIGHT_SIZE_RATIO = BigDecimal.valueOf(0.12);

    public GrowthRecord postGrowthRecord(GrowthRecord growthRecord) {
        if (growthRecordRepository.existsByFishIDAndMeasurementDate(growthRecord.getFishID(), growthRecord.getMeasurementDate())) {
            throw new IllegalArgumentException("A GrowthRecord for this fish on this date already exists.");
        }

        List<GrowthRecord> records = growthRecordRepository.findByFishIDAndIsActiveTrue(growthRecord.getFishID());
        if (!records.isEmpty()) {
            GrowthRecord latestRecord = records.stream()
                    .max(Comparator.comparing(GrowthRecord::getMeasurementDate))
                    .orElseThrow(() -> new IllegalStateException("Unexpected error retrieving latest growth record"));

            validateGrowth(latestRecord, growthRecord);
        }

        BigDecimal sizeWeightRatio = growthRecord.getWeight().divide(growthRecord.getSize(), RoundingMode.HALF_UP);
        if (sizeWeightRatio.compareTo(MIN_WEIGHT_SIZE_RATIO) < 0 || sizeWeightRatio.compareTo(MAX_WEIGHT_SIZE_RATIO) > 0) {
            throw new IllegalArgumentException("Weight-to-size ratio is unrealistic.");
        }

        growthRecord.setIsActive(true);
        GrowthRecord savedRecord = growthRecordRepository.save(growthRecord);

        Fish fishUpdate = new Fish();
        fishUpdate.setSize(growthRecord.getSize());
        fishUpdate.setWeight(growthRecord.getWeight());

        fishService.updateFish(growthRecord.getFishID(), fishUpdate);

        return savedRecord;
    }

    private void validateGrowth(GrowthRecord latestRecord, GrowthRecord newRecord) {
        long daysBetween = ChronoUnit.DAYS.between(latestRecord.getMeasurementDate(), newRecord.getMeasurementDate());
        if (daysBetween <= 0) {
            throw new IllegalArgumentException("Measurement date must be after the latest record date.");
        }

        BigDecimal sizeIncrease = newRecord.getSize().subtract(latestRecord.getSize());
        BigDecimal weightIncrease = newRecord.getWeight().subtract(latestRecord.getWeight());


        // Ensure realistic weight-to-size ratio (allowing for precision)
        BigDecimal sizeWeightRatio = newRecord.getWeight().divide(newRecord.getSize(), 5, RoundingMode.HALF_UP);
        if (sizeWeightRatio.compareTo(MIN_WEIGHT_SIZE_RATIO) < 0 || sizeWeightRatio.compareTo(MAX_WEIGHT_SIZE_RATIO) > 0) {
            throw new IllegalArgumentException(String.format(
                    "Weight-to-size ratio is unrealistic",
                    sizeWeightRatio, MIN_WEIGHT_SIZE_RATIO, MAX_WEIGHT_SIZE_RATIO));
        }

        // Calculate allowable growth
        BigDecimal maxSizeIncrease = MAX_SIZE_GROWTH_PER_DAY.multiply(BigDecimal.valueOf(daysBetween));
        BigDecimal maxWeightIncrease = latestRecord.getWeight()
                .multiply(MAX_WEIGHT_GROWTH_PERCENT_PER_DAY)
                .multiply(BigDecimal.valueOf(daysBetween));

        // Validate size growth
        if (sizeIncrease.compareTo(maxSizeIncrease) > 0) {
            throw new IllegalArgumentException(String.format(
                    "Size increase exceeds allowable growth per day",
                    sizeIncrease, maxSizeIncrease, daysBetween));
        }

        // Validate weight growth
        if (weightIncrease.compareTo(maxWeightIncrease) > 0) {
            throw new IllegalArgumentException(String.format(
                    "Weight increase exceeds allowable growth per day.",
                    weightIncrease, maxWeightIncrease, daysBetween));
        }
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

