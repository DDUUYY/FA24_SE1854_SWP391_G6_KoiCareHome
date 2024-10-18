package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private MemberRepository memberRepository;

    public List<Member> searchMembers(String firstName, String lastName) {
        return memberRepository.findByFirstNameContainingOrLastNameContaining(firstName, lastName);
    }

    public void blockOrUnblockMember(Integer memberID) {
        Member member = memberRepository.findById(memberID).orElseThrow(() -> new RuntimeException("Member not found"));
        member.setIsActive(!member.getIsActive()); // Toggle the isActive status
        memberRepository.save(member);
    }

    public List<Object[]> getAllMembersWithRoleName() {
        return memberRepository.findAllMembersWithRoleName();
    }

}
