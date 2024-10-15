package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;


import jakarta.persistence.*;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDate;
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

@Table(name = "GrowthRecord")
public class GrowthRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer RecordID;

    private Integer FishID;

    @Column(nullable = false)
    private LocalDate MeasurementDate = LocalDate.now();
    @Column(nullable = false)
    private BigDecimal Size;
    @Column(nullable = false)
    private BigDecimal Weight;
    private String Description;


    @Column(nullable = false)
    private Boolean isActive;


    private LocalDateTime CreateDate;

    private String CreateBy;

    private LocalDateTime UpdateDate;

    private String UpdateBy;

}
