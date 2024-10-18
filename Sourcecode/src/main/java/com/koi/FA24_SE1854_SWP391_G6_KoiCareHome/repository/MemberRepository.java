package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByLastName(String lastName);
    // Tìm member theo tên (FirstName hoặc LastName)
    List<Member> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
    @Query("SELECT m.id, m.password, r.roleName, m.firstName, m.lastName, m.email, m.phoneNumber, " +
            "m.isActive, m.createDate, m.createBy, m.updateDate, m.updateBy " +
            "FROM Member m JOIN m.roleID r")
    List<Object[]> findAllMembersWithRoleName();
    Optional<Member> findByEmail(String email);
}