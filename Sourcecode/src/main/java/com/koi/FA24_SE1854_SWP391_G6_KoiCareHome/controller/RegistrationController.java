package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
/**
 * @author Ha Huy Nghia Hiep
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final MemberService memberService;


    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody Member member) {
        try {
            Member savedMember = memberService.registerMember(member);
            return ResponseEntity.ok(savedMember);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member member) {
        Optional<Member> foundMember = memberService.login(member.getEmail(), member.getPassword());

        if (foundMember.isPresent()) {
            Member loggedInMember = foundMember.get();
            if (loggedInMember.getIsActive()) {
                return ResponseEntity.ok(loggedInMember.getMemberID()); // Return the MemberID if login is successful and account is active
            } else {
                return ResponseEntity.status(403).body("Account is inactive. Please contact support."); // Account is inactive
            }
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
