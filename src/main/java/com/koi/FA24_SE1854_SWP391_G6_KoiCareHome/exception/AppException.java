package com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.exception;


import com.koi.FA24_SE1854_SWP391_G6_KoiCareHome.enums.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppException extends RuntimeException{
	private ErrorCode errorCode;

	
}
