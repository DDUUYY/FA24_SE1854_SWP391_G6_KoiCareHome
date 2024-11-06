package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Pond;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.PondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pond")
@CrossOrigin(origins = "http://localhost:5173")
public class PondController {
    private final PondService pondService;

    @Autowired
    public PondController(PondService pondService) {
        this.pondService = pondService;
    }
    @GetMapping("/member")
    public List<Pond> getAllPondsWithMemberId(@RequestParam(name = "memberId") int memberId) {
        return pondService.getAllPondWithMemberId(memberId);
    }
}
