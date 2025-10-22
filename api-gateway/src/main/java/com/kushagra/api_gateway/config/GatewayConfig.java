package com.kushagra.api_gateway.config;

import com.kushagra.api_gateway.filter.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.server.WebFilter;

@Configuration
public class GatewayConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Order(Ordered.HIGHEST_PRECEDENCE)
    public WebFilter jwtFilter() {
        return jwtAuthFilter;
    }
}
