package com.accenture.web.exception;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.Date;

public class ExceptionResponse {
    @JsonAlias("timestamp")
    private Date timestamp;
    @JsonAlias("message")
    private String message;
    @JsonAlias("details")
    private String details;

    public ExceptionResponse() {
    }

    public ExceptionResponse(Date timestamp, String message, String details) {
        super();
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
