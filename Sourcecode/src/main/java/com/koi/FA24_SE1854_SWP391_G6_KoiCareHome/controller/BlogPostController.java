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
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping("/create")
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPostDto blogPostDto) {
        BlogPost blogPost = blogPostService.createBlogPost(blogPostDto);
        return new ResponseEntity<>(blogPost, HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<BlogPost> editBlogPost(@PathVariable Long id, @RequestBody BlogPostDto blogPostDto) {
        BlogPost blogPost = blogPostService.editBlogPost(id, blogPostDto);
        return new ResponseEntity<>(blogPost, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBlogPost(@PathVariable Long id) {
        blogPostService.softDeleteBlogPost(id);
        return new ResponseEntity<>("Blog post deleted temporarily", HttpStatus.OK);
    }

    @PutMapping("/recover/{id}")
    public ResponseEntity<String> recoverBlogPost(@PathVariable Long id) {
        blogPostService.recoverBlogPost(id);
        return new ResponseEntity<>("Blog post recovered", HttpStatus.OK);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<BlogPost>> getPendingBlogPosts() {
        List<BlogPost> blogPosts = blogPostService.getPendingBlogPosts();
        return new ResponseEntity<>(blogPosts, HttpStatus.OK);
    }
}
