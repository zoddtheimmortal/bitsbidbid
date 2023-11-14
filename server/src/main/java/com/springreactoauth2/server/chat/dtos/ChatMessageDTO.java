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
public class ChatMessageDTO {
    private String email;
    private ZonedDateTime sentAt;
    private String message;
}