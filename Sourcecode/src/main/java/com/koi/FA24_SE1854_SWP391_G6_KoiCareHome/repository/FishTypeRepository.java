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

    /**
     * This method is to delete a FishType by changing its status, not to remove it completely from the database
     * @param id id of FishType
     */
    @Modifying
    @Query("UPDATE FishType f SET f.isActive = false WHERE f.fishTypeID = :id")
    void deleteByID(@Param("id") int id);

    /**
     * This method is to check if another FishType with the same name had already existed in the database
     * @param name name of FishType
     * @return true if there is at least one FishType with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FishType f WHERE f.name = :name AND f.isActive = true")
    boolean existsByName(@Param("name") String name);


    /**
     * This method is to check if another FishType with the same id had already existed in the database
     * @param id id of FishType
     * @return true if there is at least one FishType with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FishType f WHERE f.fishTypeID = :id AND f.isActive = true")
    boolean existsById(@Param("id") int id);

    /**
     * This method is to find a FishType by its name
     * @param name name of FishType
     * @return a FishType entity with correspond name or null if there is no such name existed in database
     */
    @Query("SELECT f FROM FishType f WHERE f.name LIKE :name AND f.isActive = true")
    Optional<FishType> findByName(@Param("name") String name);

    /**
     * This method is to find a FishType by its name
     * @param id id of FishType
     * @return a FishType entity with correspond name or null if there is no such id existed in database
     */
    @Query("SELECT f FROM FishType f WHERE f.fishTypeID = :id AND f.isActive = true")
    Optional<FishType> findById(@Param("id") int id);

    /**
     * This method will return all fishTypes that still existed in database
     * @return list of fishTypes
     */
    @Query("SELECT f FROM FishType f WHERE f.isActive = true")
    List<FishType> findAllFishType();


}
