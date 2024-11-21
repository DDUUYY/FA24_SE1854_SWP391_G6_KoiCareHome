package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.BlogPost;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.BlogPostRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.BlogPostDto;

import java.util.Date;
import java.util.List;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    @Autowired
    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public BlogPost createBlogPost(BlogPostDto blogPostDto) {
        // Kiểm tra độ dài của tiêu đề, nội dung và tác giả
        if (blogPostDto.getTitle().length() > 255) {
            throw new IllegalArgumentException("Title exceeds maximum length of 255 characters.");
        }
        if (blogPostDto.getContent().length() > 255) {
            throw new IllegalArgumentException("Content exceeds maximum length of 255 characters.");
        }
        if (blogPostDto.getAuthor() != null && blogPostDto.getAuthor().length() > 255) {
            throw new IllegalArgumentException("Author exceeds maximum length of 255 characters.");
        }

        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setContent(blogPostDto.getContent());
        blogPost.setCreateDate(new Date());
        blogPost.setIsActive(true);
        blogPost.setStatus("Pending");

        // Gán tác giả và MemberID
        String author = blogPostDto.getAuthor();
        blogPost.setAuthor(author == null || author.trim().isEmpty() ? "Unknown User" : author);

        if (blogPostDto.getMemberId() != null) {
            blogPost.setMemberId(blogPostDto.getMemberId());
        } else {
            throw new IllegalArgumentException("MemberID is required and cannot be null.");
        }

        return blogPostRepository.save(blogPost);
    }


    public BlogPost editBlogPost(Integer id, BlogPostDto blogPostDto) {
        if (blogPostDto.getTitle().length() > 255) {
            throw new IllegalArgumentException("Title exceeds maximum length of 255 characters.");
        }
        if (blogPostDto.getContent().length() > 255) {
            throw new IllegalArgumentException("Content exceeds maximum length of 255 characters.");
        }
        if (blogPostDto.getAuthor() != null && blogPostDto.getAuthor().length() > 255) {
            throw new IllegalArgumentException("Author exceeds maximum length of 255 characters.");
        }

        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BlogPost not found"));
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setContent(blogPostDto.getContent());
        blogPost.setAuthor(blogPostDto.getAuthor());
        blogPost.setUpdateDate(new Date());

        return blogPostRepository.save(blogPost);
    }

    public void softDeleteBlogPost(Integer id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BlogPost not found"));
        blogPost.setIsActive(false);
        blogPostRepository.save(blogPost);
    }

    public void recoverBlogPost(Integer id) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BlogPost not found"));
        blogPost.setIsActive(true);
        blogPostRepository.save(blogPost);
    }

    public List<BlogPost> getBlogPostsByMemberId(Integer memberId) {
        return blogPostRepository.findByMemberId(memberId);
    }

    public List<BlogPost> getPublicBlogPosts() {
        return blogPostRepository.findByStatus("Approved");
    }


    // Lấy danh sách các bài viết chờ duyệt
    public List<BlogPost> getPendingBlogPosts() {
        return blogPostRepository.findByStatus("Pending");
    }

    // Duyệt hoặc từ chối bài viết
    public BlogPost reviewBlogPost(Integer postId, boolean isApproved, String reason) {
        // Tìm bài viết theo ID
        BlogPost blogPost = blogPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("BlogPost not found"));

        // Cập nhật trạng thái duyệt bài
        if (isApproved) {
            blogPost.setStatus("Approved");
            blogPost.setPublishDate(new Date()); // Thiết lập ngày đăng là thời gian hiện tại
            blogPost.setReason(null); // Xóa lý do từ chối nếu có
        } else {
            blogPost.setStatus("Rejected");
            // Nếu lý do từ chối không được cung cấp, đặt giá trị mặc định
            blogPost.setReason(reason != null && !reason.trim().isEmpty() ? reason : "The blog does not comply with community standards.");
            blogPost.setPublishDate(null); // Không có ngày đăng nếu bài viết bị từ chối
        }

        return blogPostRepository.save(blogPost); // Lưu bài viết với trạng thái cập nhật
    }

    public BlogPost getBlogPostById(Integer id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BlogPost not found"));
    }

}