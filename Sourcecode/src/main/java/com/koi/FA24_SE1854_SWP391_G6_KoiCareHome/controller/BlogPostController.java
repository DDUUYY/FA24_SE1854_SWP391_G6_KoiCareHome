package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.BlogPost;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service.BlogPostService;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.BlogPostDto;

import java.util.List;

@RestController
@RequestMapping("/api/blogposts")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogPostController {

    private final BlogPostService blogPostService;

    @Autowired
    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @PostMapping("/create")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPostDto blogPostDto) {
        BlogPost blogPost = blogPostService.createBlogPost(blogPostDto);
        return new ResponseEntity<>(blogPost, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<BlogPost> editBlogPost(@PathVariable Integer id, @RequestBody BlogPostDto blogPostDto) {
        BlogPost blogPost = blogPostService.editBlogPost(id, blogPostDto);
        return new ResponseEntity<>(blogPost, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlogPost(@PathVariable Integer id) {
        blogPostService.softDeleteBlogPost(id);
        return new ResponseEntity<>("Blog post deleted temporarily", HttpStatus.OK);
    }

    @PutMapping("/recover/{id}")
    public ResponseEntity<String> recoverBlogPost(@PathVariable Integer id) {
        blogPostService.recoverBlogPost(id);
        return new ResponseEntity<>("Blog post recovered", HttpStatus.OK);
    }

    // API để lấy danh sách bài viết chờ duyệt
    @GetMapping("/pending")
    public ResponseEntity<List<BlogPost>> getPendingBlogPosts() {
        List<BlogPost> pendingPosts = blogPostService.getPendingBlogPosts();
        return new ResponseEntity<>(pendingPosts, HttpStatus.OK);
    }

    // API để admin duyệt hoặc từ chối bài viết
    @PutMapping("/review/{id}")
    public ResponseEntity<String> reviewBlogPost(
            @PathVariable Integer id,
            @RequestParam boolean approved,
            @RequestParam(required = false) String reason) {

        BlogPost blogPost = blogPostService.reviewBlogPost(id, approved, reason);

        if ("Approved".equals(blogPost.getStatus())) {
            return new ResponseEntity<>("Blog has been approved.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Blog not approved. Reason:" + blogPost.getReason(), HttpStatus.OK);
        }
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByMemberId(@PathVariable Integer memberId) {
        List<BlogPost> blogPosts = blogPostService.getBlogPostsByMemberId(memberId);
        return new ResponseEntity<>(blogPosts, HttpStatus.OK);
    }

    @GetMapping("/public")
    public ResponseEntity<List<BlogPost>> getPublicBlogPosts() {
        List<BlogPost> publicPosts = blogPostService.getPublicBlogPosts();
        return new ResponseEntity<>(publicPosts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable Integer id) {
        BlogPost blogPost = blogPostService.getBlogPostById(id);
        return new ResponseEntity<>(blogPost, HttpStatus.OK);
    }
}
