package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.MemberService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Ha Huy Nghia Hiep
 */

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberService memberService;

    @DeleteMapping("/Member/{MemberID}")
    public ResponseEntity<?> deleteMember(@PathVariable Integer MemberID) {
        try {
            memberService.deleteMember(MemberID);
            return new ResponseEntity<>("Member with ID: " + MemberID + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/Member/{MemberID}")
    public ResponseEntity<?> updateMember(@PathVariable Integer MemberID, @RequestBody Member member) {
        Member updatedMember = memberService.updateMember(MemberID, member);
        if (updatedMember == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(updatedMember);
    }

    @GetMapping("Member/{MemberID}")
    public ResponseEntity<?> getMemberById(@PathVariable Integer MemberID) {
        Member member = memberService.getMemberById(MemberID);
        if (member == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(member);
    }
}

