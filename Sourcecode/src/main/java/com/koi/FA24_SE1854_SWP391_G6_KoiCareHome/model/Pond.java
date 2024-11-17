package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Ponds")
public class Pond {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PondID", nullable = false)
    private Integer pondID;

    @Column(name = "MemberID", nullable = false)
    private Integer memberID;

    @Column(name = "ReminderID")
    private Integer reminderID;

    @Column(name = "Size", nullable = false, precision = 10, scale = 2)
    private BigDecimal size;

    @Column(name = "Depth", nullable = false, precision = 10, scale = 2)
    private BigDecimal depth;

    @Column(name = "Volume", nullable = false, precision = 10, scale = 2)
    private BigDecimal volume;

    @Column(name = "DrainageCount")
    private Integer drainageCount;

    @Column(name = "PumpCapacity", precision = 10, scale = 2)
    private BigDecimal pumpCapacity;

    @Nationalized
    @Column(name = "Equipment")
    private String equipment;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

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
        updateDate = null; // Ban đầu null khi tạo mới
        isActive = true; // Mặc định hồ được kích hoạt khi tạo
        if (createBy == null) {
            createBy = "System"; // Giá trị mặc định nếu không được cung cấp
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();
    }
}
