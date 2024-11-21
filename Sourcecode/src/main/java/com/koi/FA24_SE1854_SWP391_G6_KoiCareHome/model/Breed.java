package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

/**
 * @author Quach To Anh
 */
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Breed")
public class Breed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BreedID", nullable = false)
    private Integer breedID;

    @Nationalized
    @Column(name = "BreedName", nullable = false, length = 100)
    private String breedName;

    @Nationalized
    @Column(name = "Description")
    private String description;

    @Nationalized
    @Column(name = "Origin", length = 100)
    private String origin;

    @Column(name = "MinTemperature", precision = 38, scale = 2)
    private BigDecimal minTemperature;

    @Column(name = "MaxTemperature", precision = 38, scale = 2)
    private BigDecimal maxTemperature;

    @Column(name = "MinPH", precision = 38, scale = 2)
    private BigDecimal minPH;

    @Column(name = "MaxPH", precision = 38, scale = 2)
    private BigDecimal maxPH;

    @Column(name = "MinWaterHardness", precision = 38, scale = 2)
    private BigDecimal minWaterHardness;

    @Column(name = "MaxWaterHardness", precision = 38, scale = 2)
    private BigDecimal maxWaterHardness;

    @Nationalized
    @Column(name = "FeedingInstructions")
    private String feedingInstructions;

    @Column(name = "MinTankVolume", precision = 38, scale = 2)
    private BigDecimal minTankVolume;

    @Column(name = "MinSize", precision = 38, scale = 2)
    private BigDecimal minSize;

    @Column(name = "MaxSize", precision = 38, scale = 2)
    private BigDecimal maxSize;

    @Column(name = "MinWeight", precision = 38, scale = 2)
    private BigDecimal minWeight;

    @Column(name = "MaxWeight", precision = 38, scale = 2)
    private BigDecimal maxWeight;

    @Column(name = "MaxAgeMonth")
    private Double maxAgeMonth;

    @Column(name = "isActive")
    private Boolean isActive;

    @Column(name = "CreateDate")
    private LocalDateTime createDate;

    @Nationalized
    @Column(name = "CreateBy")
    private String createBy;

    @Column(name = "UpdateDate")
    private LocalDateTime updateDate;

    @Nationalized
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