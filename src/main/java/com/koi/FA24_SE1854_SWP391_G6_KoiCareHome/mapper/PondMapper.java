package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.mapper;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.KoiPondDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.KoiPond;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddKoiPondRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.KoiPondUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PondMapper {
    KoiPond maptoKoiPond(AddKoiPondRequest addKoiPondRequest);
    KoiPondDTO maptoKoiPondDTO(KoiPond koiPond);
    @Mapping(target = "numberOfFish", ignore = true)
    void updateKoiPond(@MappingTarget KoiPond koiPond, KoiPondUpdateRequest koiPondUpdateRequest);
}
