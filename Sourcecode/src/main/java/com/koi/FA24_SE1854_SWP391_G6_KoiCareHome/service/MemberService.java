package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;


    public Member registerMember(Member member) {
        Optional<Member> existingEmail = memberRepository.findByEmail(member.getEmail());
        if (existingEmail.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        member.setPassword(passwordEncoder.encode(member.getPassword())); // Encrypt password
        member.setRoleID(1);
        member.setIsActive(true);
        return memberRepository.save(member);
    }

    public Optional<Member> login(String email, String password) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent() && passwordEncoder.matches(password, member.get().getPassword())) {
            return member;
        }
        return Optional.empty();
    }

    public void deleteMember(Integer MemberID) {
        Optional<Member> memberOptional = memberRepository.findById(MemberID);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setIsActive(false);
            memberRepository.save(member); // Update the member in the database
        } else {
            throw new EntityNotFoundException("Member with ID: " + MemberID + " not found");
        }
    }
    public Member getMemberById(Integer MemberID) {
        return memberRepository.findById(MemberID).orElse(null);
    }

    public Member updateMember(Integer MemberID,Member member) {
        Optional<Member> optionalMember = memberRepository.findById(MemberID);
        if (optionalMember.isPresent()) {
            Member existingMember = optionalMember.get();
            existingMember.setMemberName(member.getMemberName());
            existingMember.setPassword(passwordEncoder.encode(member.getPassword()));
            existingMember.setFirstName(member.getFirstName());
            existingMember.setLastName(member.getLastName());
            existingMember.setEmail(member.getEmail());
            existingMember.setPhoneNumber((member.getPhoneNumber()));
            return memberRepository.save(existingMember);
        }
        return null;
    }
}
