package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Reminder;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Member;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.ReminderRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.MemberRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.ReminderDto;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Reminder createReminder(ReminderDto reminderDto) {
        // Tìm Member dựa vào memberID từ ReminderDto
        Member member = memberRepository.findById(reminderDto.getMemberID())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // Tạo reminder mới và gán thông tin
        Reminder reminder = new Reminder();
        reminder.setTitle(reminderDto.getTitle());
        reminder.setDateTime(reminderDto.getDateTime());
        reminder.setFrequency(reminderDto.getFrequency());
        reminder.setIsActive(true);
        reminder.setCreateDate(LocalDateTime.now()); // Sử dụng LocalDateTime cho createDate
        reminder.setMember(member); // Gán Member cho Reminder

        return reminderRepository.save(reminder);
    }

    public Reminder editReminder(Integer id, ReminderDto reminderDto) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setTitle(reminderDto.getTitle());
        reminder.setDateTime(reminderDto.getDateTime());
        reminder.setFrequency(reminderDto.getFrequency());
        reminder.setUpdateDate(LocalDateTime.now()); // Sử dụng LocalDateTime cho updateDate
        reminder.setIsActive(reminderDto.getIsActive());
        return reminderRepository.save(reminder);
    }

    public void deleteReminder(Integer id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        // Xóa reminder khỏi database
        reminderRepository.deleteById(id);
    }

    public void recoverReminder(Integer id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));
        reminder.setIsActive(true);
        reminderRepository.save(reminder);
    }

    public List<Reminder> getRemindersByUser(Integer userId) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        return reminderRepository.findByMember(member);
    }

    // Scheduled task để xử lý lặp lại reminders
    @Scheduled(fixedRate = 3600000) // Chạy mỗi giờ (1 giờ = 3600000 ms)
    public void processRecurringReminders() {
        List<Reminder> activeReminders = reminderRepository.findByIsActive(true);
        LocalDateTime now = LocalDateTime.now();

        for (Reminder reminder : activeReminders) {
            if (shouldRepeat(reminder, now)) {
                createNextOccurrence(reminder);
            }
        }
    }

    private boolean shouldRepeat(Reminder reminder, LocalDateTime currentDate) {
        // Kiểm tra nếu reminder đã đến thời điểm lặp lại
        return !reminder.getDateTime().isAfter(currentDate);
    }

    private void createNextOccurrence(Reminder reminder) {
        LocalDateTime nextDateTime = reminder.getDateTime();

        // Điều chỉnh thời gian dựa trên tần suất lặp lại
        switch (reminder.getFrequency()) {
            case "daily":
                nextDateTime = nextDateTime.plus(1, ChronoUnit.DAYS);
                break;
            case "weekly":
                nextDateTime = nextDateTime.plus(1, ChronoUnit.WEEKS);
                break;
            case "biweekly":
                nextDateTime = nextDateTime.plus(2, ChronoUnit.WEEKS);
                break;
            case "monthly":
                nextDateTime = nextDateTime.plus(1, ChronoUnit.MONTHS);
                break;
            default:
                return; // Nếu không có tần suất hợp lệ, bỏ qua reminder này
        }

        // Tạo một reminder mới với thời gian đã điều chỉnh
        Reminder nextReminder = new Reminder();
        nextReminder.setTitle(reminder.getTitle());
        nextReminder.setFrequency(reminder.getFrequency());
        nextReminder.setDateTime(nextDateTime);
        nextReminder.setIsActive(true);
        nextReminder.setCreateDate(LocalDateTime.now()); // Sử dụng LocalDateTime cho createDate
        nextReminder.setMember(reminder.getMember());

        reminderRepository.save(nextReminder);
    }
}