////package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.config;
////
////import org.springframework.context.annotation.Configuration;
////import org.springframework.context.annotation.Bean;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////import static org.springframework.security.config.Customizer.withDefaults;
////
////@EnableWebSecurity
////@Configuration
////public class SecurityConfig {
////
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////        http
////                .csrf(csrf -> csrf.disable()) // Tắt CSRF nếu không cần thiết
////                .authorizeHttpRequests(auth -> auth
////                        .requestMatchers("/api/admin/**").hasRole("Admin") // Chỉ cho Admin truy cập vào endpoint này
////                        .anyRequest().authenticated() // Các yêu cầu khác phải được xác thực
////                )
////                .httpBasic(withDefaults()); // Hoặc thay bằng formLogin() nếu cần
////
////        return http.build();
////    }
////
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////}
package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author Ha Huy Nghia Hiep
 */
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
//package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // Tắt CSRF nếu không cần thiết
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // Chỉ cho phép vai trò Admin truy cập vào endpoint /api/admin/**
//                        .anyRequest().authenticated() // Các yêu cầu khác phải được xác thực
//                )
//                .httpBasic(withDefaults()); // Hoặc thay bằng formLogin() nếu cần, ví dụ: .formLogin(withDefaults());
//
//        return http.build();
//    }
//}
