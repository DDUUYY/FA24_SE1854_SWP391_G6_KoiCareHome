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
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer MemberID;

    private String MemberName;

    private String Password;

    private Integer RoleID;
    @Column(length = 10)
    private String FirstName;
    @Column(length = 10)
    private String LastName;


    private String email;

    private String PhoneNumber;

    private Boolean isActive;

    private LocalDateTime CreateDate;

    private String CreateBy;

    private LocalDateTime UpdateDate;

    private String UpdateBy;

}
