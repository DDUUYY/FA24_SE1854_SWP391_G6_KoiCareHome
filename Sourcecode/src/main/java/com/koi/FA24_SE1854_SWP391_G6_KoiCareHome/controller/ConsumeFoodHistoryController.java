package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.ConsumeFoodHistory;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.ConsumeFoodHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Quach To Anh
 */
@RestController
@RequestMapping("/api/consumeFoodHistory")
@CrossOrigin(origins = "http://localhost:5173")
public class ConsumeFoodHistoryController {

    private final ConsumeFoodHistoryService consumeFoodHistoryService;

    @Autowired
    public ConsumeFoodHistoryController(ConsumeFoodHistoryService consumeFoodHistoryService) {
        this.consumeFoodHistoryService = consumeFoodHistoryService;
    }

    /**
     * Create a new Consume Food History.
     *
     * @param consumeFoodHistory the History of feeding to create
     * @return the ResponseEntity with status 200 (OK) and with body of the new ConsumeFoodHistory
     */
    @PostMapping
    public ResponseEntity<ConsumeFoodHistory> saveConsumeFoodHistory(@RequestBody ConsumeFoodHistory consumeFoodHistory) {
        ConsumeFoodHistory newConsume = consumeFoodHistoryService.saveConsumeFoodHistory(consumeFoodHistory);
        return ResponseEntity.ok(newConsume);
    }

    /**
     * Get all ConsumeFoodHistory of a Fish.
     *
     * @return the ResponseEntity with status 200 (OK) and with body of the list of Fishes
     */
    @GetMapping("/fish")
    public List<ConsumeFoodHistory> getAllConsumeFoodHistoryByFishId(@RequestParam(name="fishID") int fishId) {
        return consumeFoodHistoryService.findAllByFishId(fishId);
    }

    @GetMapping
    public ResponseEntity<ConsumeFoodHistory> getConsumeFoodHistoryById(@RequestParam(name="consumeFoodHistoryID") int id) {
        Optional<ConsumeFoodHistory> consumeFoodHistory = consumeFoodHistoryService.getConsumeFoodHistoryById(id);
        return consumeFoodHistory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping
    public ResponseEntity<String> deleteConsumeFoodHistory(@RequestParam(name = "consumeFoodHistoryID") int id) {
        consumeFoodHistoryService.deleteByID(id);
        return ResponseEntity.ok("Consume food history deleted successfully");
    }

}