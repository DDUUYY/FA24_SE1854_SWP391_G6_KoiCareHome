    package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto;

    import com.fasterxml.jackson.annotation.JsonFormat;
    import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.Fish;
    import lombok.Data;
    import java.time.LocalDateTime;

    @Data
    public class ReminderDto {
        private String title;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
        private LocalDateTime dateTime;

        private String frequency;
        private Integer pondId;
        private Boolean isActive;
        private Integer memberID;
        private Fish fish;

    }
