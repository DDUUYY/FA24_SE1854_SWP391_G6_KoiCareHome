package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "Role", schema = "dbo")
public class Role {
    @Id
    @Column(name = "RoleID", nullable = false)
    private Integer id;

    @Column(name = "RoleName", nullable = false)
    private String roleName;

    @Nationalized
    @Column(name = "Description", nullable = false)
    private String description;

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