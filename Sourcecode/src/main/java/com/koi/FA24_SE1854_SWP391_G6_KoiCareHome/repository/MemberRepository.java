package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    // Tìm member theo tên (FirstName hoặc LastName) với @Query để khớp với tên thuộc tính
    @Query("SELECT m FROM Member m WHERE m.FirstName LIKE %:firstName% OR m.LastName LIKE %:lastName")
    List<Member> findByFirstNameContainingOrLastNameContaining(@Param("firstName") String firstName, @Param("lastName") String lastName);

    // Lấy tất cả thông tin member bao gồm thông tin Role qua JOIN
    @Query("SELECT m.MemberID, m.Password, r.RoleName, m.FirstName, m.LastName, m.email, m.PhoneNumber, " +
            "m.isActive, m.CreateDate, m.CreateBy, m.UpdateDate, m.UpdateBy " +
            "FROM Member m JOIN Role r ON m.RoleID = r.RoleID")
    List<Object[]> findAllMembers();

    // Tìm member theo email
    Optional<Member> findByEmail(String email);
}
