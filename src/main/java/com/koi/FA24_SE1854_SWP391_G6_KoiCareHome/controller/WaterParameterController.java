package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddWaterParameterRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.UpdateWaterParameterRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.response.ApiResponse;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.WaterParameterRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.waterparameter.IWaterParameterService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/waterparameter")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WaterParameterController {
    IWaterParameterService waterParameterService;
    private final WaterParameterRepository waterParameterRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findParameter(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder()
                .message("Parameters found")
                .data(waterParameterService.getWaterParameterByID(id))
                .build());
    }
    @PostMapping("/addWaterParameter")
    public ResponseEntity<ApiResponse> addWaterParameter(@RequestBody AddWaterParameterRequest addWaterParameterRequest) {
        var result = waterParameterService.createWaterParameter(addWaterParameterRequest);
        return ResponseEntity.ok(ApiResponse.builder().data(result).build());
    }
    @PutMapping("/updateWaterParameter/{id}")
    ResponseEntity<ApiResponse> updateWaterParameter(@PathVariable Long id, @RequestBody UpdateWaterParameterRequest updateWaterParameterRequest) {
        var result = waterParameterService.updateWaterParameter(updateWaterParameterRequest,id);
        return ResponseEntity.ok(ApiResponse.builder().data(result).build());
    }
    @DeleteMapping("/delete/{id}")
    ResponseEntity<ApiResponse> deletePond(@PathVariable Long id) {
        waterParameterService.deleteWaterParameter(id);
        return ResponseEntity.ok(ApiResponse.builder().message("Water parameter has been deleted").build());
    }

}
