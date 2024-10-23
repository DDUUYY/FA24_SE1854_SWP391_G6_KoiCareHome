package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.FoodType;
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
public interface
FoodTypeRepository extends JpaRepository<FoodType, Integer> {

    /**
     * This method is to delete a FoodType by changing its status, not to remove it completely from the database
     * @param id id of FoodType
     */
    @Modifying
    @Query("UPDATE FoodType f SET f.isActive = false WHERE f.foodTypeId = :id")
    void deleteByID(@Param("id") int id);

    /**
     * This method is to check if another FoodType with the same name had already existed in the database
     * @param name name of FoodType
     * @return true if there is at least one FoodType with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FoodType f WHERE f.name = :name AND f.isActive = true")
    boolean existsByName(@Param("name") String name);


    /**
     * This method is to check if another FoodType with the same id had already existed in the database
     * @param id id of FoodType
     * @return true if there is at least one FoodType with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FoodType f WHERE f.foodTypeId = :id AND f.isActive = true")
    boolean existsById(@Param("id") int id);

    /**
     * This method is to find a FoodType by its name
     * @param name name of FoodType
     * @return a FoodType entity with correspond name or null if there is no such name existed in database
     */
    @Query("SELECT f FROM FoodType f WHERE f.name LIKE :name AND f.isActive = true")
    Optional<FoodType> findByName(@Param("name") String name);

    /**
     * This method is to find a FoodType by its name
     * @param id id of FoodType
     * @return a FoodType entity with correspond name or null if there is no such id existed in database
     */
    @Query("SELECT f FROM FoodType f WHERE f.foodTypeId = :id AND f.isActive = true")
    Optional<FoodType> findById(@Param("id") int id);

    /**
     * This method will return all FoodTypes that still existed in database
     * @return list of FoodTypes
     */
    @Query("SELECT f FROM FoodType f WHERE f.isActive = true")
    List<FoodType> findAllFoodType();
}
