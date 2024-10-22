package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
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
public interface FishRepository extends JpaRepository<Fish, Integer> {

    /**
     * This method is to check if another Fish with the same name had already existed in the same pond except the Fish
     * with id = ID
     * @param name name of Fish
     * @param ID id of Fish
     * @param pondID id of Fish's pond
     * @return true if there is at least one other Fish with the same name in the same pond and vice versa
     */
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
            "FROM Fish f WHERE f.name = :name AND f.pondID = :pondID AND f.fishID <> :ID AND f.isActive = true")
    boolean existsByNameAndPondIdExceptId(@Param("name") String name,
                                          @Param("ID") int ID,
                                          @Param("pondID") int pondID);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Member f WHERE f.MemberID = :memberId AND f.isActive = true")
    boolean existsMemberId(@Param("memberId") int memberId);


    /**
     * This method is to find a Fish by its id
     * @param id id of Fish
     * @return a Fish entity with correspond id or null if there is no such id existed in database
     */
    @Query("SELECT f FROM Fish f WHERE f.fishID = :fishID AND f.isActive = true")
    Optional<Fish> findFishById(@Param("fishID") int id);

    /**
     * This method is to find a Fish by its name in a specific pond
     * @param name name of Fish
     * @param pondID id of Fish's pond
     * @return a Fish entity with correspond name in the required pond or
     * null if there is no such fish with name existed in that pond in database
     */
    @Query("SELECT f FROM Fish f WHERE f.name = :name AND f.pondID = :pondID AND f.isActive = true")
    Optional<Fish> findFishByNameWithPondID(@Param("name") String name,
                                            @Param("pondID") int pondID);

    /**
     * This method will return all fishes that still existed in a specific pond in the database
     * @param pondId id of the fish's pondZ
     * @return list of fishes
     */
    @Query("SELECT f FROM Fish f WHERE f.pondID = :pondId AND f.isActive = true")
    List<Fish> findAllFishWithPondId(@Param("pondId") int pondId);

    /**
     * This method will return all fishes that still existed in database
     * @return list of fishes
     */
    @Query("SELECT f FROM Fish f WHERE f.isActive = true")
    List<Fish> findAllFish();

    /**
     * This method is to delete a Fish by changing its status, not to remove it completely from the database
     * @param id id of Fish
     */
    @Modifying
    @Query("UPDATE Fish f SET f.isActive = false WHERE f.fishID = :id")
    void deleteByID(@Param("id") int id);

    /**
     * This method will return all fishes under Member id that still existed in database
     * @return list of fishes of Member with "id"
     */
    @Query("SELECT f FROM Fish f WHERE f.memberID = :memberID AND f.isActive = true")
    List<Fish> findAllFishWithMemberId(@Param("memberID") int memberID);

}
