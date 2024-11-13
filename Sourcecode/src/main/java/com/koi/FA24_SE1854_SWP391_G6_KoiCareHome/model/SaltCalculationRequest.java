package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;
import jakarta.persistence.*;
import lombok.*;


@Data
@Getter
@Setter
public class SaltCalculationRequest {
    private double pondVolume;            // Thể tích hồ (lít)
    private double currentConcentration;  // Nồng độ muối hiện tại (%)
    private double desiredConcentration;  // Nồng độ muối mong muốn (%)
    private double waterChange;           // Lượng nước thay đổi (lít)
}
