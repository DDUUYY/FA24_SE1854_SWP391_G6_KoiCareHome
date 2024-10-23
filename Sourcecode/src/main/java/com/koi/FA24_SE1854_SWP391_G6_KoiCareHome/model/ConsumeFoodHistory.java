package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

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
@Table(name = "ConsumeFoodHistory")
public class ConsumeFoodHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consumeFoodHistoryID;

    @Column(name = "FishID", nullable = false)
    private int fishID;

    @Column(name = "FoodID", nullable = false)
    private int foodID;

    @Column(name = "Quantity", nullable = false)
    private float quantity;

    @Column(name = "Description", nullable = true)
    private String description;

    @Column(name = "ConsumeDate", nullable = false)
    private LocalDateTime consumeDate;

    @Column(name = "isActive", nullable = true)
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
        isActive = true;
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }

}
