package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    /**
     * This method is to delete Food by changing its status, not to remove it completely from the database
     * @param id id of Food
     */
    @Modifying
    @Query("UPDATE Food f SET f.isActive = false WHERE f.foodID = :id")
    void deleteByID(@Param("id") int id);

    /**
     * This method is to check if another Food with the same name had already existed in the database
     * @param name name of Food
     * @return true if there is at least one Food with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Food f WHERE f.name = :name AND f.isActive = true")
    boolean existsByName(@Param("name") String name);


    /**
     * This method is to check if another Food with the same id had already existed in the database
     * @param id id of Food
     * @return true if there is at least one Food with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Food f WHERE f.foodID = :id AND f.isActive = true")
    boolean existsById(@Param("id") int id);

    /**
     * This method is to find Food by its name
     * @param name name of Food
     * @return a Food entity with correspond name or null if there is no such name existed in database
     */
    @Query("SELECT f FROM Food f WHERE f.name LIKE :name AND f.isActive = true")
    Optional<Food> findByName(@Param("name") String name);

    /**
     * This method is to find Food by its name
     * @param id id of Food
     * @return a Food entity with correspond name or null if there is no such id existed in database
     */
    @Query("SELECT f FROM Food f WHERE f.foodID = :id AND f.isActive = true")
    Optional<Food> findById(@Param("id") int id);

    /**
     * This method will return all Foods that still existed in database
     * @return list of Foods
     */
    @Query("SELECT f FROM Food f WHERE f.isActive = true")
    List<Food> findAllFood();
}
