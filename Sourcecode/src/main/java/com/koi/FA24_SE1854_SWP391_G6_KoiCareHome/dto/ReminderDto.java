package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReminderDto {
    private String title;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime dateTime;

    private String frequency;
    private Integer memberID;
}
