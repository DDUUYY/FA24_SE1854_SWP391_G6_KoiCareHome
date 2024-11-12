package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;//package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.ConsumeFoodHistory;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * @author Quach To Anh
 */
public interface ConsumeFoodHistoryRepository extends JpaRepository<ConsumeFoodHistory, Integer> {
    @Query("SELECT c FROM ConsumeFoodHistory c WHERE c.fishID = :id AND c.isActive = true")
    List<ConsumeFoodHistory> findAllByFishID(@Param("id") int id);

    @Modifying
    @Query("UPDATE ConsumeFoodHistory c SET c.isActive = false WHERE c.consumeFoodHistoryID = :id")
    void deleteByID(@Param("id") int id);

    @Query("SELECT c FROM ConsumeFoodHistory c WHERE c.consumeFoodHistoryID = :id AND c.isActive = true")
    Optional<Fish> findConsumeFoodHistoryByID(@Param("id") int id);
}