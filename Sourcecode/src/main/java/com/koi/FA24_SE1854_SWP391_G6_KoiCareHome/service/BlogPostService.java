package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.BlogPost;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository.BlogPostRepository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.dto.BlogPostDto;

import java.util.Date;
import java.util.List;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    public BlogPost createBlogPost(BlogPostDto blogPostDto) {
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setAuthor(blogPostDto.getAuthor());
        blogPost.setCreateDate(new Date());
        blogPost.setStatus("Pending");
        blogPost.setIsActive(true);
        return blogPostRepository.save(blogPost);
    }

    public BlogPost editBlogPost(Integer id, BlogPostDto blogPostDto) {
        BlogPost blogPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BlogPost not found"));
        blogPost.setTitle(blogPostDto.getTitle());
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

    public List<BlogPost> getPendingBlogPosts() {
        return blogPostRepository.findByStatus("Pending");
    }
}
