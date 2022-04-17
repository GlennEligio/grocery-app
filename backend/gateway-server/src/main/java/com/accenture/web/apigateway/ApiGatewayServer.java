package com.accenture.web.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
//@EnableEurekaClient
public class ApiGatewayServer {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayServer.class, args);
	}
}
