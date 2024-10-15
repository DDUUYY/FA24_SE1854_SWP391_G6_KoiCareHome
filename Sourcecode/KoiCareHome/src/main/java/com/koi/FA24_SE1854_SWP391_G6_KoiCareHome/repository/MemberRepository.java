package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Ha Huy Nghia Hiep
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmail(String email);
}
