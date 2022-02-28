package com.accenture.web.exception;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class UserResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(UserResponseEntityExceptionHandler.class);

	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<?> handleAllException(Exception ex, WebRequest request) {
		log.info("Encountered Exception");
		ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), 
				ex.getMessage(),
				request.getDescription(false));

		return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = AppException.class)
	public ResponseEntity<?> handleUserNotFoundException(AppException ex, WebRequest request) {
		log.info("Encountered UserNotException");
		ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),
				ex.getMessage(),
				request.getDescription(false));

		return new ResponseEntity<>(exceptionResponse, ex.getStatus());
	}

	@ExceptionHandler(value = {BadCredentialsException.class, UsernameNotFoundException.class})
	public ResponseEntity<?> handleBadCredentialsException(Exception ex, WebRequest request) {
		log.info("Encountered BadCredentialsException or UsernameNotFoundException");
		ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),
				ex.getMessage(),
				request.getDescription(false));

		return new ResponseEntity<>(exceptionResponse, HttpStatus.FORBIDDEN);
	}



	@ExceptionHandler(value = io.jsonwebtoken.ExpiredJwtException.class)
	public ResponseEntity<?> handleExpiredJwtException(Exception ex, WebRequest request) {
		log.info("Encountered ExpiredJwtException");
		ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),
				ex.getMessage(),
				request.getDescription(false));

		return new ResponseEntity<>(exceptionResponse, HttpStatus.FORBIDDEN);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		log.info("Encountered Bad Request");
		ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),
																	ex.getMessage(),
																	ex.getBindingResult().getAllErrors().toString());

		return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
	}

}
