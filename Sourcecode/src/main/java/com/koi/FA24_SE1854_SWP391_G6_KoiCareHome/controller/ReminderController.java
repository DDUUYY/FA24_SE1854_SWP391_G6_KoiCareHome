package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Reminder;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.ReminderService;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.ReminderDto;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    @PostMapping("/create")
    public ResponseEntity<Reminder> createReminder(@RequestBody ReminderDto reminderDto) {
        Reminder reminder = reminderService.createReminder(reminderDto);
        return new ResponseEntity<>(reminder, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Reminder> editReminder(@PathVariable Long id, @RequestBody ReminderDto reminderDto) {
        Reminder reminder = reminderService.editReminder(id, reminderDto);
        return new ResponseEntity<>(reminder, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReminder(@PathVariable Long id) {
        reminderService.softDeleteReminder(id);
        return new ResponseEntity<>("Reminder deleted temporarily", HttpStatus.OK);
    }

    @PutMapping("/recover/{id}")
    public ResponseEntity<String> recoverReminder(@PathVariable Long id) {
        reminderService.recoverReminder(id);
        return new ResponseEntity<>("Reminder recovered", HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reminder>> getRemindersByUser(@PathVariable Integer userId) {  // Thay đổi từ Long sang Integer
        List<Reminder> reminders = reminderService.getRemindersByUser(userId);
        return new ResponseEntity<>(reminders, HttpStatus.OK);
    }

}
