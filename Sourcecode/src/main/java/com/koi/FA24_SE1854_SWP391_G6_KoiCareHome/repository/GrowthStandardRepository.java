package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GrowthStandardRepository extends JpaRepository<GrowthStandard, Integer> {

    /**
     * This method is to delete a GrowthStandard
     * by changing its status, not to remove it completely from the database
     * @param id id of GrowthStandard
     *
     */
    @Modifying
    @Query("UPDATE GrowthStandard g SET g.isActive = false WHERE g.growthStandardID = :id")
    void deleteByID(@Param("id") int id);

    /**
     * This method is to check if another GrowthStandard
     * with the same id had already existed in the database
     * @param id id of GrowthStandard
     *
     * @return true if there is at least one GrowthStandard
     * with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END FROM GrowthStandard g WHERE " +
            "g.growthStandardID = :id AND g.isActive = true")
    boolean existsById(@Param("id") int id);

    /**
     * This method is to check if another growth standard with the same age month had already existed in the same breed
     * except the growth standard with id = id
     * @param breedId id of breed
     * @param ageMonths age month of breed
     * @param id id of growth standard
     * @return true if there is at least one other growth standard with the same age month of the same breed and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END FROM GrowthStandard g WHERE g.breedID = :breedId " +
            "AND g.ageMonths = :ageMonths AND g.growthStandardID <> :id AND g.isActive = true")
    boolean existsByBreedIdAndAgeMonthExceptId(@Param("breedId") int breedId, @Param("ageMonths") double ageMonths, @Param("id") int id);

    /**
     * This method is to find a GrowthStandard
     * by its name
     * @param id id of GrowthStandard
     *
     * @return a GrowthStandard
     * entity with correspond name or null if there is no such id existed in database
     */
    @Query("SELECT g FROM GrowthStandard g WHERE g.growthStandardID = :id AND g.isActive = true")
    Optional<GrowthStandard> findById(@Param("id") int id);

    /**
     * This method will return all growth standards that still existed in database
     * @return list of standards
     */
    @Query("SELECT g FROM GrowthStandard g WHERE g.isActive = true")
    List<GrowthStandard> findAllGrowthStandards();


    /**
     * This method will return all requirements that still existed in database by breedID
     * @return list of requirements that have the same breedID
     */
    @Query("SELECT g FROM GrowthStandard g WHERE g.breedID = :breedID AND g.isActive = true")
    List<GrowthStandard> findAllGrowthStandardsByBreedId(@Param("breedID") int breedID);

    /**
     * This method will return all requirements that still existed in database by breedID and a specific ageMonth
     * @return list of requirements that have the same breedID
     */
    @Query("SELECT g FROM GrowthStandard g WHERE g.ageMonths = :ageMonth AND g.breedID = :breedID AND g.isActive = true")
    List<GrowthStandard> findAllGrowthStandardsByBreedIdAndAgeMonth(@Param("breedID") int breedID, @Param("ageMonth") int ageMonth);

}