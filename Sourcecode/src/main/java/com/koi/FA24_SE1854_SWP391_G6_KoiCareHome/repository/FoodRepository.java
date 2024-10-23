package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Food;
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
public interface FoodRepository extends JpaRepository<Food, Integer> {

    /**
     * This method is to find a kind of Food by its id
     * @param id id of Food
     *
     * @return a Food
     * entity with correspond id or null if there is no such id existed in database
     */
    @Query("SELECT f FROM Food f WHERE f.foodID = :FoodID AND f.isActive = true")
    Optional<Food> findFoodById(@Param("FoodID") int id);

    /**
     * This method will return all Food that still existed in database
     * @return list of Food
     */
    @Query("SELECT f FROM Food f WHERE f.isActive = true")
    List<Food> findAllFood();

    /**
     * This method is to delete a kind of Food by changing its status, not to remove it completely from the database
     * @param id id of Food
     */
    @Modifying
    @Query("UPDATE Food f SET f.isActive = false WHERE f.foodID = :id")
    void deleteByID(@Param("id") int id);

}
