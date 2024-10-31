package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Reminder;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;

import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    // Tìm tất cả các reminder của một thành viên (Member) và còn active
    List<Reminder> findByMemberAndIsActive(Member member, Boolean isActive);
}
