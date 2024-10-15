package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KoiPondUpdateRequest {
    private String name;
    private double size;
    private int drainCount;
    private Double depth;
    private int skimmer;
    private Double pumpCapacity;
    private String imageUrl;
}
