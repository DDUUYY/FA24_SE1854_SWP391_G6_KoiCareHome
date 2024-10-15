package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FishTypeRepository extends JpaRepository<FishType, Integer> {

    @Modifying
    @Query("UPDATE FishType f SET f.isActive = false WHERE f.fishTypeID = :id")
    void deleteByID(@Param("id") int id);

//    boolean existsFishTypeByName(String name);
//
//    @Modifying
//    @Query(value = "INSERT INTO FishType (name, createdBy, isActive) VALUES (:name, :createBy, :isActive);", nativeQuery = true)
//    FishType createFishTypeByName(@Param("name") String fishType_Name,
//                            @Param("createdBy") String  createdBy,
//                            @Param("isActive") boolean isActive);
//
//    FishType addFishType(FishType fishType);
//    @Query("SELECT f FROM FishType f WHERE f.fishTypeID = :FishTypeID")
//    FishType findFishTypeByID(@Param("FishTypeID") int id);
//
//    FishType save(FishType fishType);
}
