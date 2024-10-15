package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.koipond;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.KoiPondDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.mapper.PondMapper;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.KoiPond;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddKoiPondRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.KoiPondUpdateRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.KoiPondRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KoiPondService implements IKoiPondService {


    KoiPondRepository koiPondRepository;

    PondMapper pondMapper;

    @Override
    public KoiPondDTO createKoiPond(AddKoiPondRequest addKoiPondRequest) {

        KoiPond koiPond = pondMapper.maptoKoiPond(addKoiPondRequest);
        LocalDateTime now = LocalDateTime.now();
        koiPond.setCreateDate(now);
        // Save the entity
        KoiPond savedKoiPond = koiPondRepository.save(koiPond);
        // Convert the saved entity to KoiPondDTO and return it
        return pondMapper.maptoKoiPondDTO(savedKoiPond);
    }


    @Override
    public KoiPondDTO getKoiPondById(Long id) {
        // Fetch KoiPond by ID
        KoiPond koiPond = koiPondRepository.findExistingKoiPondById(id)
                .orElseThrow(() -> new RuntimeException("KoiPond not found with ID: " + id));
        return pondMapper.maptoKoiPondDTO(koiPond);
    }

    @Override
    public void deleteKoiPond(Long id) {
        // Delete KoiPond by ID
        if (koiPondRepository.existsById(id)) {
            koiPondRepository.deleteById(id);
        } else {
            throw new RuntimeException("KoiPond not found with ID: " + id);
        }
    }

    @Override
    public KoiPondDTO updateKoiPond(KoiPondUpdateRequest koiPondUpdateRequest, Long koiPondId) {
        // Find the KoiPond to be updated
        KoiPond existingKoiPond = koiPondRepository.findExistingKoiPondById(koiPondId)
                .orElseThrow(() -> new RuntimeException("KoiPond not found with ID: " + koiPondId));

        // Update fields
        pondMapper.updateKoiPond(existingKoiPond, koiPondUpdateRequest);
        KoiPond updatedKoiPond = koiPondRepository.save(existingKoiPond);

        // Save the updated KoiPond
        return pondMapper.maptoKoiPondDTO(updatedKoiPond);
    }
}
