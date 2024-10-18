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
    public List<Member> searchMembers(@RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName) {
        return adminService.searchMembers(firstName, lastName);
    }

    @PostMapping("/members/block/{memberID}")
    public void blockOrUnblockMember(@PathVariable Integer memberID) {
        adminService.blockOrUnblockMember(memberID);
    }


    @GetMapping("/members")
    public List<Object[]> getAllMembersWithRoleName() {
        return adminService.getAllMembersWithRoleName();
    }
}
