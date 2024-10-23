package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author Quach To Anh
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FoodID", nullable = false)
    private int foodID;

    @Column(name = "FoodTypeID", nullable = false)
    private int foodTypeID;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Weight")
    private BigDecimal Weight;

    @Column(name = "Description")
    private String description;

    @Column(name = "Vendor")
    private String Vendor;

    @Column(name = "isActive")
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
        isActive = true;
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }

}
