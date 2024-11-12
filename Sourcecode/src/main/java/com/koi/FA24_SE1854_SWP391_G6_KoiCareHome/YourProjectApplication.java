package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class YourProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(YourProjectApplication.class, args);
    }
}
