package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Ha Huy Nghia Hiep
 */
@Repository

public interface GrowthRecordRepository extends JpaRepository<GrowthRecord, Integer> {
    List<GrowthRecord> findByFishIDAndIsActiveTrue(Integer fishID);
}
