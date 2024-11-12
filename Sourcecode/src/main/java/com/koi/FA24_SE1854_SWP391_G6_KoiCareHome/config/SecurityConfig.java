package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

<<<<<<< HEAD
@Configuration
public class SecurityConfig {

    // Bean PasswordEncoder
=======
/**
 * @author Ha Huy Nghia Hiep
 */
@Configuration
public class SecurityConfig {

>>>>>>> GrowthRecord
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> GrowthRecord
