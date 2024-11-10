package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
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
                // Tạo response chứa cả memberID và roleID
                Map<String, Object> response = new HashMap<>();
                response.put("userId", loggedInMember.getMemberID());
                response.put("roleID", loggedInMember.getRoleID()); // Thêm roleID vào response

                return ResponseEntity.ok(response); // Trả về response với thông tin cần thiết
            } else {
                return ResponseEntity.status(403).body("Account is inactive. Please contact support.");
            }
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false); // Lấy session hiện tại nếu có
        if (session != null) {
            session.invalidate(); // Xóa session
        }
        return ResponseEntity.ok("Logged out successfully");
    }

}