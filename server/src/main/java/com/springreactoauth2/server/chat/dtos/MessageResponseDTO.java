package com.springreactoauth2.server.chatBck.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponseDTO {
    private String userName;
    private String message;
    private ZonedDateTime dateTime;
}
