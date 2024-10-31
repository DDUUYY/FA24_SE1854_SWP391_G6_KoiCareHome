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
    @Column(name = "PostID")
    private Integer postId;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Author", nullable = false)
    private String author;

    @Column(name = "PublishDate")
    private Date publishDate;

    @Column(name = "Status", nullable = false)
    private String status; // Pending, Approved, Rejected

    @Column(name = "isActive", nullable = false)
    private Boolean isActive;

    @Column(name = "CreateDate", nullable = false)
    private Date createDate;

    @Column(name = "UpdateDate")
    private Date updateDate;
}
