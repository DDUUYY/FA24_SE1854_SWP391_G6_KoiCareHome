package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
    private String message;
    private int status;
}
