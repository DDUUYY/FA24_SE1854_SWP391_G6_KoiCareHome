package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception;

public class DatabaseException extends RuntimeException {

  public DatabaseException(String message) {
    super(message);
  }

  public DatabaseException(String message, Throwable cause) {
    super(message, cause);
  }
}
