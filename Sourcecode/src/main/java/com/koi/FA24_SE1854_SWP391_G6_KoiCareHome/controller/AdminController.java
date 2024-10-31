package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/members/search")
    public List<Member> searchMembers(@RequestParam(required = false) String FirstName, @RequestParam(required = false) String LastName) {
        return adminService.searchMembers(FirstName, LastName);
    }

    @PostMapping("/members/block/{MemberID}")
    public void blockOrUnblockMember(@PathVariable Integer MemberID) {
        adminService.blockOrUnblockMember(MemberID);
    }

    @GetMapping("/members")
    public List<Object[]> getAllMembers() {
        return adminService.getAllMembers();
    }
}
