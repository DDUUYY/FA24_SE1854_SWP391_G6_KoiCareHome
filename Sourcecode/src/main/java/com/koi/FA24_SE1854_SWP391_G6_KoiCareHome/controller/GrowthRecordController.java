package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.GrowthRecord;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.GrowthRecordService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Ha Huy Nghia Hiep
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GrowthRecordController {
    private final GrowthRecordService growthRecordService;

    @PostMapping("/GrowthRecord")
    public GrowthRecord postGrowRecord(@RequestBody GrowthRecord growthRecord) {
        return growthRecordService.PostGrowthRecord(growthRecord);
    }

    @GetMapping("/GrowthRecord")
    public List<GrowthRecord> getAllGrowthRecords() {
        return growthRecordService.getAllGrowthRecords();
    }

    @DeleteMapping("/GrowthRecord/{RecordID}")
    public ResponseEntity<?> deleteGrowthRecord(@PathVariable Integer RecordID) {
        try {
            growthRecordService.deleteGrowthRecord(RecordID);
            return new ResponseEntity<>("GrowthRecord with ID: " + RecordID + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/GrowthRecord/{RecordID}")
    public ResponseEntity<?>getGrowthRecordById(@PathVariable Integer RecordID) {
        GrowthRecord growthRecord = growthRecordService.getGrowthRecordById(RecordID);
        if (growthRecord == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(growthRecord);
    }

    @PatchMapping("/GrowthRecord/{RecordID}")
    public ResponseEntity<?> updateGrowthRecord(@PathVariable Integer RecordID,@RequestBody GrowthRecord growthRecord) {
        GrowthRecord updatedRecord = growthRecordService.updateGrowthRecord(RecordID, growthRecord);
        if (updatedRecord == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(updatedRecord);
    }
}
