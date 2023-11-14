package com.springreactoauth2.server.chatBck.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedChatMessagesDTO {
    private List<ChatMessageDTO> chatMessages;
    private int numPages;
}
