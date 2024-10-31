package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.model.BlogPost;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByStatus(String status);
}
