package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.mapper;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.WaterParameterDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.WaterParameter;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddWaterParameterRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.UpdateWaterParameterRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WaterParameterMapper {
    @Mapping(source = "koiPond.id", target = "koiPondId")
    WaterParameterDTO mapToDTO(WaterParameter waterParameter);
    @Mapping(source = "koiPondId", target = "koiPond.id")  // map koiPondId from DTO to koiPond in entity
    @Mapping(target = "createDateTime", ignore = true)
    WaterParameter mapToEntity(AddWaterParameterRequest addWaterParameterRequest);
    void updateWaterParameter(@MappingTarget WaterParameter waterParameter, UpdateWaterParameterRequest waterParameterRequest);
}