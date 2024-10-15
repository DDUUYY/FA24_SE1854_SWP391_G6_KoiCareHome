package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Koi Care System",
                        email = "moethecute@gmail.com"
                ),
                description = "Koi Care documentation for API",
                title = "Koi Care System API",
                version = "1.0.0",
                license = @License(
                        name = "Koi License",
                        url = "https://www.koi.com/license"
                ),
                termsOfService = "https://www.koi.com/terms"
        ),
        servers = {
                @Server(
                        description = "Local Server",
                        url = "http://localhost:8080"
                )

        }
)
public class OpenApiConfig {
}
