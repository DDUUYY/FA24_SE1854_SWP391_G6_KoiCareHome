package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface FishRepository extends JpaRepository<Fish, Integer> {

//    boolean existsByName(String name);
//    boolean existsByNameAndPondID(String name, int pondId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
            "FROM Fish f WHERE f.name = :name AND f.fishID <> :ID")
    boolean existsByNameExceptId(@Param("name") String name,
                                          @Param("ID") int ID);

    @Query("SELECT f FROM Fish f WHERE f.fishID = :fishID")
    Fish findFishById(@Param("fishID") int id);

    @Query("SELECT f FROM FishType f WHERE f.fishTypeID = :FishTypeID")
    boolean existsFishTypeId(@Param("FishTypeID") int FishTypeID);

    //    Page<Fish> findAllByPondID(int pondID, Pageable pageable);
//    List<Fish> findAllByPondID(int pondID);
//
//    int countByPondID(int pondID);
//
//    int countByUserID(int userID);

//    @Query("select f from Fish f where f.userID = ?1")
//    Page<Fish> findAllByUserId(int userId, Pageable pageable);
//    @Query("select f from Fish f where f.userID = ?1 ")
//    List<Fish> findAllByUserID(int userID);

//    @Query("select f from Fish f where f.userID = ?1 and f.pondID is null or f.pondID = 0")
//    List<Fish> findFishByUserWithNoPond(int userID);
//
//    @Query("select (count(k) > 0) from Fish f where f.name = ?1 and f.userID = ?2")
//    boolean existsByNameWithUserID(String name, int userID);
//
//    @Query("select (count(f) > 0) from Fish f where f.userID = ?1")
//    boolean isOwnByUser(int userId);
}
