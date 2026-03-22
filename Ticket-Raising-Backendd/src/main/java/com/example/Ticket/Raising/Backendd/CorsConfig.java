package com.example.Ticket.Raising.Backendd;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // 🔌 tells Spring this is a config class
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")          // 🔌 applies to all /api/ routes
                    .allowedOrigins("http://localhost:5173")  // 🔌 your React Vite port
                    .allowedMethods("GET", "POST", "PUT", "DELETE")  // 🔌 methods you use
                    .allowedHeaders("*")
                    .allowCredentials(true);  // 🔌 needed for JWT token in headers
            }
        };
    }
}
