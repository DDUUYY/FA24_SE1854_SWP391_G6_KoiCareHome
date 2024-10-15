package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.koipond;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.KoiPondDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddKoiPondRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.KoiPondUpdateRequest;

public interface IKoiPondService {
    KoiPondDTO createKoiPond(AddKoiPondRequest addKoiPondRequest);
    KoiPondDTO getKoiPondById(Long id);
    void deleteKoiPond(Long id);
    KoiPondDTO updateKoiPond(KoiPondUpdateRequest koiPondUpdateRequest, Long koiPondId );

}
