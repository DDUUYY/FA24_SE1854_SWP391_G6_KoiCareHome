package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class KoiPondDTO {
    private Long id;
    private String name;
    private LocalDateTime createDate;
    private double size;
    private int drainCount;
    private Double depth;
    private int skimmer;
    private Double pumpCapacity;
    private String imageUrl;
    private int numberOfFish;
    private int memberID;
}