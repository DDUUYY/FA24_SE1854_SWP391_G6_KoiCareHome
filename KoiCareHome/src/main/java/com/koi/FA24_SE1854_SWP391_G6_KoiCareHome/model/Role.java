package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer RoleID;


    private String RoleName;


    private String Description;


    private Boolean isActive;

    @Column(nullable = true)
    private LocalDateTime CreateDate;

    @Column(nullable = true)
    private String CreateBy;

    @Column(nullable = true)
    private LocalDateTime UpdateDate;

    @Column(nullable = true)
    private String UpdateBy;
}
