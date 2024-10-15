package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.AddKoiPondRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.request.KoiPondUpdateRequest;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.payload.response.ApiResponse;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.koipond.IKoiPondService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/koipond")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KoiPondController {
    IKoiPondService koiPondService;
    @PostMapping("/addPond")
    ResponseEntity<ApiResponse> addPond(@RequestBody AddKoiPondRequest koiPondRequest) {
        var result = koiPondService.createKoiPond(koiPondRequest);
        return ResponseEntity.ok(ApiResponse.builder().data(result).build());

    }
    @PutMapping("/updatePond/{id}")
    ResponseEntity<ApiResponse> updatePond(@PathVariable Long id, @RequestBody KoiPondUpdateRequest koiPondUpdateRequest) {
        var result = koiPondService.updateKoiPond(koiPondUpdateRequest, id);
        return ResponseEntity.ok(ApiResponse.builder().data(result).build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> findPond(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder()
                .message("Pond found")
                .data(koiPondService.getKoiPondById(id))
                .build());
    }
    @DeleteMapping("/delete/{id}")
    ResponseEntity<ApiResponse> deletePond(@PathVariable Long id) {
        koiPondService.deleteKoiPond(id);
        return ResponseEntity.ok(ApiResponse.builder().message("Pond has been deleted").build());
    }
}
