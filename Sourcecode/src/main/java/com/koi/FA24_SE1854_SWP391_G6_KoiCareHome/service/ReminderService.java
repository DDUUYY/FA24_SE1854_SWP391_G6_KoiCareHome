package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Reminder;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.ReminderRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.MemberRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.ReminderDto;


import java.util.Date;
import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Reminder createReminder(ReminderDto reminderDto) {
        Reminder reminder = new Reminder();
        reminder.setTitle(reminderDto.getTitle());
        reminder.setDateTime(reminderDto.getDateTime());
        reminder.setFrequency(reminderDto.getFrequency());
        reminder.setIsActive(true);
        reminder.setCreateDate(new Date());
        return reminderRepository.save(reminder);
    }

    public Reminder editReminder(Long id, ReminderDto reminderDto) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setTitle(reminderDto.getTitle());
        reminder.setDateTime(reminderDto.getDateTime());
        reminder.setFrequency(reminderDto.getFrequency());
        reminder.setUpdateDate(new Date());
        return reminderRepository.save(reminder);
    }

    public void softDeleteReminder(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setIsActive(false);
        reminderRepository.save(reminder);
    }

    public void recoverReminder(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setIsActive(true);
        reminderRepository.save(reminder);
    }

    public List<Reminder> getActiveRemindersForMember(Member member) {
        return reminderRepository.findByMemberAndIsActive(member, true);
    }

    public List<Reminder> getRemindersByUser(Integer userId) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        return reminderRepository.findByMemberAndIsActive(member, true);
    }

}
