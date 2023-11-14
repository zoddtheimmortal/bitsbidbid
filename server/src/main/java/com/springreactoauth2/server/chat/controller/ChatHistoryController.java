package com.springreactoauth2.server.chatBck.controller;

import com.springreactoauth2.server.chatBck.dtos.PaginatedChatMessagesDTO;
import com.springreactoauth2.server.chatBck.service.ChatMessageService;
import com.springreactoauth2.server.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatHistoryController {

    @Autowired
    private ChatMessageService chatMessageService;

    @GetMapping("/chatHistory/{sentTo}")
    public PaginatedChatMessagesDTO getChatHistory(final Principal principal,
                                                   @PathVariable String sentTo,
                                                   @RequestParam(defaultValue = "0") int pageNumber) {
        try {
            return chatMessageService.getChatHistory(principal.getName(), sentTo, pageNumber);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User does not exist");
        }
    }

    @GetMapping("/chatHistoryUsers")
    public List<UserDto> getChatHistoryUsers(final Principal principal) {
        return chatMessageService.getUsersWithChatHistory(principal.getName());
    }
}