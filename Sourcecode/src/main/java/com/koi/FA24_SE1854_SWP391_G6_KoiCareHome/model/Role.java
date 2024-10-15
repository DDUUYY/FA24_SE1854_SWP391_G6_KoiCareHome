package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * @author Ha Huy Nghia Hiep
 */

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Role")
public class Role {
    @Id
    private Integer RoleID;


    private String RoleName;


    private String Description;


    private Boolean isActive;


    private LocalDateTime CreateDate;


    private String CreateBy;


    private LocalDateTime UpdateDate;


    private String UpdateBy;
}
