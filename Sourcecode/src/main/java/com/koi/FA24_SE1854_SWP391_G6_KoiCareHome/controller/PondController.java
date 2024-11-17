package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Pond;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.PondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pond")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép từ frontend
public class PondController {

    private final PondService pondService;

    @Autowired
    public PondController(PondService pondService) {
        this.pondService = pondService;
    }

    @GetMapping("/member")
    public ResponseEntity<?> getAllPondsWithMemberId(@RequestParam(name = "memberId") int memberId) {
        List<Pond> ponds = pondService.getAllPondWithMemberId(memberId);
        if (ponds.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No ponds found for memberID: " + memberId);
        }
        return ResponseEntity.ok(ponds);
    }

    @GetMapping
    public ResponseEntity<?> getAllPonds() {
        List<Pond> ponds = pondService.getAllPonds();
        if (ponds.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No ponds available.");
        }
        return ResponseEntity.ok(ponds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPondById(@PathVariable Integer id) {
        Pond pond = pondService.getPondById(id);
        if (pond == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pond not found with id: " + id);
        }
        return ResponseEntity.ok(pond);
    }

    @PostMapping
    public ResponseEntity<?> createPond(@RequestBody Pond pond) {
        // Kiểm tra các trường bắt buộc
        if (pond.getMemberID() == null || pond.getSize() == null || pond.getDepth() == null || pond.getVolume() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Missing required fields: memberID, size, depth, or volume.");
        }
        try {
            Pond createdPond = pondService.createPond(pond);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPond);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while creating pond: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePond(@PathVariable Integer id, @RequestBody Pond pond) {
        Pond updatedPond = pondService.updatePond(id, pond);
        if (updatedPond == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pond not found with id: " + id);
        }
        return ResponseEntity.ok(updatedPond);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePond(@PathVariable Integer id) {
        try {
            pondService.deletePond(id);
            return ResponseEntity.ok("Pond deleted successfully with id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while deleting pond: " + e.getMessage());
        }
    }
}