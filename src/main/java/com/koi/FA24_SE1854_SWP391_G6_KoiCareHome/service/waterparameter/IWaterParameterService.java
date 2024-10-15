package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.waterparameter;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.WaterParameterDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddWaterParameterRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.UpdateWaterParameterRequest;

public interface IWaterParameterService {
    WaterParameterDTO createWaterParameter(AddWaterParameterRequest request);
    WaterParameterDTO getWaterParameterByID(Long id);
    void deleteWaterParameter(Long id);
    WaterParameterDTO updateWaterParameter(UpdateWaterParameterRequest updateWaterParameterRequest, Long id);
}
