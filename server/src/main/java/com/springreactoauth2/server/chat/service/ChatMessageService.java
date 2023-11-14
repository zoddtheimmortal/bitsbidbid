package com.springreactoauth2.server.chatBck.service;

import com.springreactoauth2.server.chatBck.dtos.ChatMessageDTO;
import com.springreactoauth2.server.chatBck.dtos.PaginatedChatMessagesDTO;
import com.springreactoauth2.server.chatBck.model.ChatMessage;
import com.springreactoauth2.server.chatBck.repository.ChatMessageRepository;
import com.springreactoauth2.server.user.dto.UserDto;
import com.springreactoauth2.server.user.model.User;
import com.springreactoauth2.server.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatMessageService {
    private static final int PAGE_SIZE = 10;

    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    public PaginatedChatMessagesDTO getChatHistory(final String sentBy, final String sentTo, final int pageNumber) throws Exception, Exception {
        final User sentByUser = userRepository.findByEmail(sentBy).orElse(null);
        final Optional<User> sendToUser = userRepository.findByEmail(sentTo);
        if (sendToUser.isPresent()) {
            final PageRequest pageRequest = PageRequest.of(pageNumber, PAGE_SIZE);
            final Page<ChatMessage> chatMessages = chatMessageRepository.findChatMessageBySentByAndSentToOrderBySentAtDesc(sentByUser,
                    sendToUser.get(), pageRequest);

            final List<ChatMessageDTO> messages = chatMessages.stream().map(chatMessage ->
                    ChatMessageDTO.builder().message(chatMessage.getContent())
                            .sentAt(chatMessage.getSentAt().atZone(ZoneId.of("UTC")))
                            .email(chatMessage.getSentBy().getEmail()).build()).collect(Collectors.toList());
            return PaginatedChatMessagesDTO.builder().numPages(chatMessages.getTotalPages()).chatMessages(messages).build();
        } else {
            throw new Exception();
        }
    }


    public void saveChatHistory(final String sentBy, final String sentTo, final String content) throws Exception {
        final User sentByUser = userRepository.findByEmail(sentBy).orElse(null);
        final Optional<User> sendToUser = userRepository.findByEmail(sentTo);
        if (sendToUser.isPresent()) {
            final ChatMessage chatMessage = new ChatMessage();
            chatMessage.setContent(content);
            chatMessage.setSentBy(sentByUser);
            chatMessage.setSentTo(sendToUser.get());
            chatMessageRepository.save(chatMessage);
        } else {
            throw new Exception();
        }
    }

    public List<UserDto> getUsersWithChatHistory(final String userName) {
        final User user = userRepository.findByEmail(userName).orElse(null);
        final List<Long> userIds = chatMessageRepository.getDistinctUsersBySentByOrSentAt(user.getId());
        final List<User> users = userRepository.findAllById(userIds);
        return users.stream().map(userEntity -> modelMapper.map(userEntity, UserDto.class)).collect(Collectors.toList());
    }
}