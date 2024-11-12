package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.config;

<<<<<<< HEAD
import org.springframework.context.annotation.Bean;
=======
import org.springframework.context.annotation.ComponentScan;
>>>>>>> GrowthRecord
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
<<<<<<< HEAD
=======
@ComponentScan(basePackages = "com.koi.FA24_SE1854_SWP391_G6_KoiCareHome")
>>>>>>> GrowthRecord
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
<<<<<<< HEAD
                .allowedOrigins("http://localhost:5173")
=======
                .allowedOrigins("http://localhost:3000")
>>>>>>> GrowthRecord
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
<<<<<<< HEAD


=======
>>>>>>> GrowthRecord
}
