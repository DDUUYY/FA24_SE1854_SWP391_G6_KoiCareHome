package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Date;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FishID", nullable = false)
    private int fishID;

    @Column(name = "FishTypeID", nullable = false)
    private int fishTypeID;

    @Column(name = "PondID", nullable = false)
    private int pondID;

    @Column(name = "MemberID", nullable = false)
    private int memberID;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Size")
    private BigDecimal size;

    @Column(name = "Weight")
    private BigDecimal weight;

    @Column(name = "AgeMonth")
    private Double ageMonth;

    @Column(name = "Birthday")
    private LocalDate birthday;

    @Column(name = "Gender")
    private String gender;

    @Column(name = "BreedID")
    private int breedID;

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

    public void countAgeMonth() {
        if (birthday != null) {
            Period period = Period.between(birthday, LocalDate.now());
            int days = period.getDays();
            double dayFraction = (double) days / 30;
            double totalMonths = (period.getYears() * 12) + period.getMonths() + dayFraction;
            BigDecimal roundedMonths = BigDecimal.valueOf(totalMonths).setScale(1, RoundingMode.HALF_UP);
            this.ageMonth = roundedMonths.doubleValue();
        } else {
            this.ageMonth = (double) 0;
        }
    }

    public void dateOfBirthCal() {
        if(ageMonth != 0 ) {
            LocalDate currentDate = LocalDate.now();
            int fullMonths = ageMonth.intValue();
            double fractionalMonths = ageMonth - fullMonths;
            LocalDate dateOfBirth = currentDate.minusMonths(fullMonths);
            if (fractionalMonths > 0) {
                int daysInMonth = dateOfBirth.lengthOfMonth();
                int daysToSubtract = (int) Math.round(fractionalMonths * daysInMonth);
                dateOfBirth = dateOfBirth.minusDays(daysToSubtract);
            }
            this.birthday = dateOfBirth;
        }else {
            this.birthday = createDate.toLocalDate();
        }
    }

    @PrePersist
    protected void onCreate() {
        createDate = LocalDateTime.now();
        updateDate = LocalDateTime.now();
        isActive = true;
        countAgeMonth(); // Ensure ageMonth is calculated on creation
    }


    @PreUpdate
    protected void onUpdate() {
        updateDate = LocalDateTime.now();

    }}