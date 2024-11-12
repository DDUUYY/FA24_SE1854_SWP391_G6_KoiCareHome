package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Integer> {
    @Query("SELECT o FROM OrderHistory o WHERE o.member.MemberID = :MemberID")
    List<OrderHistory> findByMember_MemberID(Integer MemberID);

}
