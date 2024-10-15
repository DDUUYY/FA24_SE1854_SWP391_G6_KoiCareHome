package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class KoiPond {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createDate;
    private String name;
    private double size;
    private int drainCount;
    private Double depth;
    private int skimmer;
    private Double pumpCapacity;
    private String imageUrl;
    @Transient
    private int numberOfFish;
    private int memberID = 1;
}
