package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WaterParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    LocalDateTime createDateTime;
    double nitrite;// NO2
    double nitrate;  // NO3
    double phosphate; // PO4
    double ammonium;  // NH4
    double hardness;  // GH
    double oxygen;    // O2
    double temperature;// temp in Pond
    double phValue;
    double carbonHardness;  // KH
    double carbonDioxide;  // CO2
    double salt;
    double totalChlorine;
    double temp; //temp outdoor
    double amountFed;
    String note;
    @ManyToOne
    @JoinColumn(name = "koiPond_id")
    KoiPond koiPond;
}