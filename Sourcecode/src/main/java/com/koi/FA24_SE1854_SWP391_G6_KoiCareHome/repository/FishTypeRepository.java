package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FishType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Quach To Anh
 */
@Repository
public interface FishTypeRepository extends JpaRepository<FishType, Integer> {

    @Modifying
    @Query("UPDATE FishType f SET f.isActive = false WHERE f.fishTypeID = :id")
    void deleteByID(@Param("id") int id);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FishType f WHERE f.name = :name AND f.isActive = true")
    boolean existsByName(@Param("name") String name);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FishType f WHERE f.fishTypeID = :id AND f.isActive = true")
    boolean existsById(@Param("id") int id);

    @Query("SELECT f FROM FishType f WHERE f.name LIKE :name AND f.isActive = true")
    Optional<FishType> findByName(@Param("name") String name);

    @Query("SELECT f FROM FishType f WHERE f.fishTypeID = :id AND f.isActive = true")
    Optional<FishType> findById(@Param("id") int id);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN false ELSE true END FROM FishType f WHERE f.isActive = true")
    boolean checkIfEmpty(List<FishType> fishTypes);

    @Query("SELECT f FROM FishType f WHERE f.isActive = true")
    List<FishType> findAllFishType();

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
