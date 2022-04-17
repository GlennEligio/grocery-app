package com.accenture.web.apigateway.config;

import com.accenture.web.apigateway.dtos.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.OrderedGatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final String userServiceUri;

    private static final Logger log = LoggerFactory.getLogger(AuthFilter.class);

    private final WebClient.Builder webClientBuilder;

    public AuthFilter(WebClient.Builder webClientBuilder, Environment env) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
        String envUserServiceUri = env.getProperty("USER_SERVICE_URI");
        if(envUserServiceUri != null){
            this.userServiceUri = envUserServiceUri;
            return;
        }
        this.userServiceUri = "lb://user-service";
    }

    @Override
    public GatewayFilter apply(Config config) {
        return new OrderedGatewayFilter((exchange, chain) -> {
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

            log.info("Authentication the token at {}", userServiceUri);

            return webClientBuilder.build()
                    .post()
                    .uri(userServiceUri + "/api/v1/users/validateToken?token=" + parts[1])
                    .retrieve().bodyToMono(UserDto.class)
                    .map(userDto -> {
                        log.info("Authentication success! " + "Username " + userDto.getUsername() + " access " + exchange.getRequest().getPath());
                        exchange.getRequest()
                                .mutate()
                                .header("X-auth-role", userDto.getRole());
                        return exchange;
                    }).flatMap(chain::filter);
        }, 1);
    }

    public static class Config {
        // empty
    }
}
