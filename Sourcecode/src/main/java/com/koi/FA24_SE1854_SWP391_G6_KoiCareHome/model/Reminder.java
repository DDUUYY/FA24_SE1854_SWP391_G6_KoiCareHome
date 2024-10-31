package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import lombok.Data;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Reminder")
@Data
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ReminderID")
    private Integer reminderId;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "DateTime")
    private Date dateTime;

    @Column(name = "frequency")
    private String frequency;

    @Column(name = "isActive")
    private Boolean isActive;

    @Column(name = "CreateDate")
    private Date createDate;

    @Column(name = "UpdateDate")
    private Date updateDate;

    @JoinColumn(name = "PondID")
    private Integer pondId;

    @ManyToOne
    @JoinColumn(name = "FishID")
    private Fish fish;

    @ManyToOne
    @JoinColumn(name = "MemberID")
    private Member member;
}
