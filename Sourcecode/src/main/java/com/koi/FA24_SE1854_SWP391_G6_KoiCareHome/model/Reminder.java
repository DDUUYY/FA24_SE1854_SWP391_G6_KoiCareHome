package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reminder")
@Data
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ReminderID")
    @JsonProperty("id") // Thêm dòng này để ánh xạ JSON thành "id"
    private Integer reminderId;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "DateTime", nullable = false)
    private LocalDateTime dateTime;

    @Column(name = "frequency")
    private String frequency;

    @Column(name = "isActive")
    private Boolean isActive;

    @Column(name = "CreateDate")
    private LocalDateTime createDate;

    @Column(name = "UpdateDate")
    private LocalDateTime updateDate;

    @JoinColumn(name = "PondID")
    private Integer pondId;

    @ManyToOne
    @JoinColumn(name = "FishID")
    private Fish fish;

    @ManyToOne
    @JoinColumn(name = "MemberID")
    private Member member;
}
