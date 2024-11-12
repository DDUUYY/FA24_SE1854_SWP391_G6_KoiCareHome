package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import org.springframework.stereotype.Service;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationResponse;

@Service
public class SaltCalculatorService {

    // Mức nồng độ muối chuẩn (có thể thay đổi nếu cần)
    private static final double STANDARD_CONCENTRATION = 0.5;

    public SaltCalculationResponse calculateSalt(SaltCalculationRequest request) {
        double volume = request.getPondVolume();
        double currentConcentration = request.getCurrentConcentration();
        double desiredConcentration = request.getDesiredConcentration();
        double waterChange = request.getWaterChange();

        // Tính lượng muối cần thêm vào hồ (kg)
        double saltRequired = (desiredConcentration - currentConcentration) * volume / 1000;

        // Tính lượng muối cần thêm cho nước thay (kg)
        double saltForWaterChange = desiredConcentration * waterChange / 1000;

        // So sánh với nồng độ chuẩn và tạo thông báo
        String message;
        if (desiredConcentration < STANDARD_CONCENTRATION) {
            message = "Nồng độ muối bạn muốn đạt thấp hơn mức chuẩn 0.5%. Bạn nên tăng thêm muối để đạt hiệu quả chống bệnh tật và tảo.";
        } else if (desiredConcentration == STANDARD_CONCENTRATION) {
            message = "Nồng độ muối mong muốn đạt mức chuẩn 0.5%. Hồ của bạn đang ở tình trạng tốt.";
        } else {
            message = "Nồng độ muối mong muốn cao hơn mức chuẩn. Hãy đảm bảo bạn không sử dụng quá nhiều muối để tránh ảnh hưởng đến sức khỏe của cá.";
        }

        return new SaltCalculationResponse(saltRequired, saltForWaterChange, message);
    }
}