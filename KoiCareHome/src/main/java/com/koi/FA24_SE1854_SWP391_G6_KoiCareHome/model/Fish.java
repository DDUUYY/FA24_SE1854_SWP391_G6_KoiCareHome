package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Fish")
public class Fish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    @Column(name = "FishID", nullable = false)
    private int fishID;

    @Column(name = "FishTypeID", nullable = false)
    private int fishTypeID;

    @Column(name = "PondID", nullable = false)
    private int pondID = 1;

    @Column(name = "MemberID",nullable = false)
    private int memberID = 1;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "ImageURL", nullable = true)
    private String imageURL;

    @Column(name = "Size", nullable = true)
    private float size;

    @Column(name = "Weight", nullable = true)
    private float weight;

    @Column(name = "Age", nullable = true)
    private String age;

    @Column(name = "Gender", nullable = true)
    private String gender;

    @Column(name = "Breed", nullable = true)
    private String breed;

    @Column(name = "Origin", nullable = true)
    private String origin;

    @Column(name = "Price", nullable = true)
    private float price;

    @Column(name = "isActive", nullable = false)
    private boolean isActive;

    @Column(name = "CreateDate", nullable = true)
    private LocalDateTime createDate;

    @Column(name = "CreateBy", nullable = false)
    private String createBy;

    @Column(name = "UpdateDate", nullable = true)
    private LocalDateTime updateDate;

    @Column(name = "UpdateBy", nullable = true)
    private String updateBy;

    @PrePersist
    protected void onCreate() {
        createDate = LocalDateTime.now();
        updateDate = LocalDateTime.now();
        createBy = "user";
        updateBy = "user";
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }
}
