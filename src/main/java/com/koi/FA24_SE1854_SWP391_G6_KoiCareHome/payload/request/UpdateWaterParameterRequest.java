package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWaterParameterRequest {
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
    Long koiPondId;
}
