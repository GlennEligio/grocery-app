package com.accenture.web.config;

import com.accenture.web.exception.ExceptionResponse;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Configuration
public class WebClientConfig {

    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder()
                .filter(ExchangeFilterFunction.ofResponseProcessor(this::renderApiErrorResponse));
    }

    private Mono<ClientResponse> renderApiErrorResponse(ClientResponse clientResponse){
        if(clientResponse.statusCode().isError()){
            return clientResponse.bodyToMono(ExceptionResponse.class)
                    .flatMap(exceptionResponse -> Mono.error(new ResponseStatusException(
                            clientResponse.statusCode(),
                            exceptionResponse.getMessage())));
        }
        return Mono.just(clientResponse);
    }

}
