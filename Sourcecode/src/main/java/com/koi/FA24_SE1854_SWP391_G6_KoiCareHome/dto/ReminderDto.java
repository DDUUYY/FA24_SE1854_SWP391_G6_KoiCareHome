package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto;

import lombok.Data;
import java.util.Date;

@Data
public class ReminderDto {
    private String title;
    private Date dateTime;
    private String frequency;
}
