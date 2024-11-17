package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author Quach To Anh
 */
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "GrowthStandard")
public class GrowthStandard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GrowthID", nullable = false)
    private Integer growthStandardID;

    @Column(name = "BreedID", nullable = false)
    private Integer breedID;

    @Column(name = "AgeMonths", nullable = false)
    private Double ageMonths;

    @Column(name = "ExpectedWeight", precision = 10, scale = 2)
    private BigDecimal expectedWeight;

    @Column(name = "ExpectedSize", precision = 10, scale = 2)
    private BigDecimal expectedSize;

    @Column(name = "isActive")
    private boolean isActive;

    @Column(name = "CreateDate")
    private LocalDateTime createDate;

    @Column(name = "CreateBy")
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