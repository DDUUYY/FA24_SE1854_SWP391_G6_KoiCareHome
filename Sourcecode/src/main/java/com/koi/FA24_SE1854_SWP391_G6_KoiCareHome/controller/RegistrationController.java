package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
//import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.MemberService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/auth")
//public class RegistrationController {
//
//    private final MemberService memberService;
//
//
//    @PostMapping("/register")
//    public ResponseEntity<?> registerMember(@RequestBody Member member) {
//        try {
//            Member savedMember = memberService.registerMember(member);
//            return ResponseEntity.ok(savedMember);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(409).body(e.getMessage());
//        }
//    }
//
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Member member) {
//        Optional<Member> foundMember = memberService.login(member.getEmail(), member.getPassword());
//        if (foundMember.isPresent() && foundMember.get().getIsActive()) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(401).body("Invalid email, password, or inactive account");
//        }
//    }
//}
