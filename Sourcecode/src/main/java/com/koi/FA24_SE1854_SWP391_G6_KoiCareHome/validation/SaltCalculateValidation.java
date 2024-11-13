package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.validation;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.SaltCalculationRequest;

public class SaltCalculateValidation {
    public static String validateSaltCalculationRequest(SaltCalculationRequest request) {
        StringBuilder errors = new StringBuilder();

        if (request.getPondVolume() <= 0) {
            errors.append("Pond volume must be greater than 0.\n");
        }
        if (request.getCurrentConcentration() < 0 || request.getCurrentConcentration() > 100) {
            errors.append("Current concentration must be between 0% and 100%.\n");
        }
        if (request.getDesiredConcentration() < 0 || request.getDesiredConcentration() > 100) {
            errors.append("Desired concentration must be between 0% and 100%.\n");
        }
        if (request.getWaterChange() < 0) {
            errors.append("Water change cannot be negative.\n");
        }
        if (request.getDesiredConcentration() < request.getCurrentConcentration()) {
            errors.append("Desired concentration must be greater than or equal to the current concentration.\n");
        }

        return errors.toString().isEmpty() ? null : errors.toString();
    }
}
