package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;


import org.springframework.stereotype.Service;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationResponse;

@Service
public class SaltCalculatorService {

    public SaltCalculationResponse calculateSalt(SaltCalculationRequest request) {
        double volume = request.getPondVolume();
        double currentConcentration = request.getCurrentConcentration();
        double desiredConcentration = request.getDesiredConcentration();
        double waterChange = request.getWaterChange();

        // Tính lượng muối cần thêm vào hồ (kg)
        double saltRequired = (desiredConcentration - currentConcentration) * volume / 1000;

        // Tính lượng muối cần thêm cho nước thay (kg)
        double saltForWaterChange = desiredConcentration * waterChange / 1000;

        return new SaltCalculationResponse(saltRequired, saltForWaterChange);
    }
}
