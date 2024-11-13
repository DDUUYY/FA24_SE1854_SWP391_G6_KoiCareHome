package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception;

public class NetworkException extends RuntimeException {

    public NetworkException(String message) {
        super(message);
    }

    public NetworkException(String message, Throwable cause) {
        super(message, cause);
    }
}
