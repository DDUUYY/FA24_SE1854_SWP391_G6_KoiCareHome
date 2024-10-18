package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "Member", schema = "dbo")
public class Member {
    @Id
    @Column(name = "MemberID", nullable = false)
    private Integer id;

    @Column(name = "Password", nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "RoleID", nullable = false)
    private com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Role roleID;

    @Column(name = "FirstName", nullable = false, length = 10)
    private String firstName;

    @Column(name = "LastName", nullable = false, length = 10)
    private String lastName;

    @Column(name = "Email", nullable = false)
    private String email;

    @Column(name = "PhoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive = false;

    @Column(name = "CreateDate")
    private OffsetDateTime createDate;

    @Column(name = "CreateBy", nullable = false)
    private String createBy;

    @Column(name = "UpdateDate")
    private OffsetDateTime updateDate;

    @Column(name = "UpdateBy", nullable = false)
    private String updateBy;

}