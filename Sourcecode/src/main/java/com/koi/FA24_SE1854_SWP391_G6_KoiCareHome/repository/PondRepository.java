package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Pond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondRepository extends JpaRepository<Pond, Integer> {

    @Query("SELECT p FROM Pond p WHERE p.memberID = :memberID AND p.isActive = true")
    List<Pond> findAllPondWithMemberId(@Param("memberID") int memberID);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Pond p WHERE p.pondID =:pondId AND " +
            "p.memberID = :memberId AND p.isActive = true")
    boolean existsByIdAndMemberId(@Param("pondId") int pondId, @Param("memberId") int memberId);

}