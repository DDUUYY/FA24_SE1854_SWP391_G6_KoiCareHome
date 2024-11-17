package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Breed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BreedRepository extends JpaRepository<Breed, Integer> {

    /**
     * This method is to delete a Breed
     * by changing its status, not to remove it completely from the database
     * @param id id of Breed
     *
     */
    @Modifying
    @Query("UPDATE Breed b SET b.isActive = false WHERE b.breedID = :id")
    void deleteByID(@Param("id") int id);

    /**
     * This method is to check if another Breed
     * with the same name had already existed in the database
     * @param name name of Breed
     *
     * @return true if there is at least one Breed
     * with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Breed" +
            " b WHERE b.breedName = :name AND b.isActive = true")
    boolean existsByName(@Param("name") String name);


    /**
     * This method is to check if another Breed
     * with the same id had already existed in the database
     * @param id id of Breed
     *
     * @return true if there is at least one Breed
     * with the same name and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Breed" +
            " b WHERE b.breedName = :name AND b.breedID <> :id AND b.isActive = true")
    boolean existsByNameExceptId(@Param("name") String name, @Param("id") int id);

    /**
     * This method is to find a Breed
     * by its name
     * @param name name of Breed
     *
     * @return a Breed
     * entity with correspond name or null if there is no such name existed in database
     */
    @Query("SELECT b FROM Breed b WHERE b.breedName LIKE :name AND b.isActive = true")
    Optional<Breed> findByName(@Param("name") String name);

    /**
     * This method is to find a Breed
     * by its name
     * @param id id of Breed
     *
     * @return a Breed
     * entity with correspond name or null if there is no such id existed in database
     */
    @Query("SELECT b FROM Breed b WHERE b.breedID = :id AND b.isActive = true")
    Optional<Breed> findById(@Param("id") int id);

    /**
     * This method will return all breeds that still existed in database
     * @return list of breeds
     */
    @Query("SELECT b FROM Breed b WHERE b.isActive = true")
    List<Breed> findAllBreeds();


}