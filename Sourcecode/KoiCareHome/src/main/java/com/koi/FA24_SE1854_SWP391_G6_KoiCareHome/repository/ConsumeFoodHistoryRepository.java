package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;//package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.ConsumeFoodHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author Quach To Anh
 */
public interface ConsumeFoodHistoryRepository extends JpaRepository<ConsumeFoodHistory, Integer> {
    @Query("SELECT c FROM ConsumeFoodHistory c WHERE c.fishID = :id")
    List<ConsumeFoodHistory> findAllByFishID(@Param("id") int id);
}
