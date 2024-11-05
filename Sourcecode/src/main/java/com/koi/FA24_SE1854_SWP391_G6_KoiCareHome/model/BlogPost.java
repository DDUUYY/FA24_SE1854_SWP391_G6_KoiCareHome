package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model;

import lombok.Data;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "BlogPosts")
@Data
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PostID", nullable = false)
    private Integer postId;

    @Column(name = "MemberID", nullable = false)
    private Integer memberId;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "BlogContent", nullable = false)
    private String content;

    @Column(name = "Author")
    private String author;

    @Column(name = "PublishDate")
    private Date publishDate;

    @Column(name = "Status", nullable = false)
    private String status; // Pending, Approved, Rejected

    @Column(name = "Reason")
    private String reason;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "CreateDate", nullable = false)
    private Date createDate;

    @Column(name = "UpdateDate")
    private Date updateDate;
}
