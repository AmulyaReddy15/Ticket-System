package com.example.Ticket.Raising.Backendd;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  //  tells Spring this is a config class
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOriginPatterns("http://localhost:5173", "http://localhost:5174")  // 🔌 CHANGE allowedOrigins to allowedOriginPatterns
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // 🔌 ADD OPTIONS
                    .allowedHeaders("*")
                    .allowCredentials(true);  // this only works with allowedOriginPatterns not allowedOrigins
            }
        };
    }
}
