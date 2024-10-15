package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.waterparameter;



import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.WaterParameterDTO;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.mapper.WaterParameterMapper;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.WaterParameter;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddWaterParameterRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.UpdateWaterParameterRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.WaterParameterRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WaterParameterService implements IWaterParameterService {
    WaterParameterRepository waterParameterRepository;
    WaterParameterMapper waterParameterMapper;
    @Override
    public WaterParameterDTO createWaterParameter(AddWaterParameterRequest request) {
        WaterParameter waterParameter = waterParameterMapper.mapToEntity(request);
        waterParameter.setCreateDateTime(java.time.LocalDateTime.now());
        WaterParameter savedWaterParameter = waterParameterRepository.save(waterParameter);
        return waterParameterMapper.mapToDTO(savedWaterParameter);
    }
    @Override
    public WaterParameterDTO getWaterParameterByID(Long id) {
        WaterParameter waterParameter = waterParameterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WaterParameter not found with ID: " + id));
        return waterParameterMapper.mapToDTO(waterParameter);
    }
    @Override
    public WaterParameterDTO updateWaterParameter(UpdateWaterParameterRequest updateWaterParameterRequest, Long id ) {
        WaterParameter existingWaterParameter = waterParameterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WaterParameter not found with ID: " + id));

        // Update the existing entity with new values
        waterParameterMapper.updateWaterParameter(existingWaterParameter, updateWaterParameterRequest);

        // Save the updated entity
        WaterParameter updatedWaterParameter = waterParameterRepository.save(existingWaterParameter);
        return waterParameterMapper.mapToDTO(updatedWaterParameter);
    }
    @Override
    public void deleteWaterParameter(Long id) {
        if (waterParameterRepository.existsById(id)) {
            waterParameterRepository.deleteById(id);
        } else {
            throw new RuntimeException("KoiPond not found with ID: " + id);
        }
    }
}
