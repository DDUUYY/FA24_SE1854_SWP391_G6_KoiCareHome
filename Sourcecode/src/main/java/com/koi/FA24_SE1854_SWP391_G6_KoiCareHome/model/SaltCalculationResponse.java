package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import lombok.*;

@Data
@Getter
@Setter
public class SaltCalculationResponse {
    private double totalSalt;           // Lượng muối cần thêm (kg)
    private double saltPerWaterChange; // Lượng muối cho lần thay nước (kg)
    private String message;            // Thông báo cho người dùng

    public SaltCalculationResponse(double totalSalt, double saltPerWaterChange, String message) {
        this.totalSalt = totalSalt;
        this.saltPerWaterChange = saltPerWaterChange;
        this.message = message;
    }
}
