package com.accenture.web.apigateway.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.OrderedGatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Component
public class RoleFilter extends AbstractGatewayFilterFactory<RoleFilter.Config> {

    private static final Logger log = LoggerFactory.getLogger(RoleFilter.class);


    public RoleFilter(WebClient.Builder webClientBuilder) {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return new OrderedGatewayFilter((exchange, chain) -> {
            log.info("Role filter");
            String role = Objects.requireNonNull(exchange.getRequest().getHeaders().get("X-auth-role")).get(0);
            if(Objects.equals(role, "ROLE_CLERK")){
                if(Objects.equals(exchange.getRequest().getMethod(), HttpMethod.GET)){
                    if(exchange.getRequest().getPath().toString().equals("/api/v1/items")){
                        return chain.filter(exchange);
                    }
                }else if (Objects.equals(exchange.getRequest().getMethod(), HttpMethod.POST)){
                    if(exchange.getRequest().getPath().toString().equals("/api/v1/bills")){
                        return chain.filter(exchange);
                    }
                }
                throw new RuntimeException("Clerk can only GET items and POST bills");
            }
            return chain.filter(exchange);
        }, 2);
    }

    public static class Config {

    }
}
