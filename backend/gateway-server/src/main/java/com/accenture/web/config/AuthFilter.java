package com.accenture.web.config;

import com.accenture.web.dtos.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private static final Logger log = LoggerFactory.getLogger(AuthFilter.class);

    private final WebClient.Builder webClientBuilder;

    public AuthFilter(WebClient.Builder webClientBuilder) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            // Check if "Authorization" header is present
            if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Missing Authorization header");
            }

            // Parse the Authorization header
            String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String[] parts = authHeader.split(" ");

            if(parts.length != 2 && !parts[0].equals("Bearer")){
                throw new RuntimeException("Incorrect auth type");
            }

            log.info("Authenticating token, {}", parts[1]);

            return webClientBuilder.build()
                    .post()
                    .uri("http://user-service/api/v1/users/validateToken?token=" + parts[1])
                    .retrieve().bodyToMono(UserDto.class)
                    .map(userDto -> {
                        log.info("Authentication success! " + "Username " + userDto.getUsername() + " access " + exchange.getRequest().getPath());
                        if(!exchange.getRequest().getMethod().toString().equals("GET") && userDto.getRole().contains("ROLE_CLERK")){
                            log.info("Clerks sent non GET request");
                            throw new RuntimeException("Clerks can only send GET request");
                        }
                        exchange.getRequest()
                                .mutate()
                                .header("X-auth-user-id", userDto.getUsername());
                        return exchange;
                    }).flatMap(chain::filter);
        });
    }

    public static class Config {
        // empty
    }
}
