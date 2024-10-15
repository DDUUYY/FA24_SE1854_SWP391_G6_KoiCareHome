package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * @author Quach To Anh
 */
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
    private int pondID;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "ImageURL")
    private String imageURL;

    @Column(name = "Size")
    private float size;

    @Column(name = "Weight")
    private float weight;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "Breed")
    private String breed;

    @Column(name = "Origin")
    private String origin;

    @Column(name = "Price")
    private float price;

    @Column(name = "isActive", nullable = false)
    private boolean isActive;

    @Column(name = "CreateDate")
    private LocalDateTime createDate;

    @Column(name = "CreateBy", nullable = false)
    private String createBy;

    @Column(name = "UpdateDate")
    private LocalDateTime updateDate;

    @Column(name = "UpdateBy")
    private String updateBy;

    @PrePersist
    protected void onCreate() {
        createDate = LocalDateTime.now();
        updateDate = LocalDateTime.now();
        createBy = "user";
        updateBy = "user";
        isActive = true;
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }
}
