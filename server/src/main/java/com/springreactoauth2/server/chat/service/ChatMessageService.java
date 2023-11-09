package com.springreactoauth2.server.chat.service;

import com.springreactoauth2.server.chat.dtos.ChatMessageDTO;
import com.springreactoauth2.server.chat.dtos.PaginatedChatMessagesDTO;
import com.springreactoauth2.server.chat.model.ChatMessage;
import com.springreactoauth2.server.chat.repository.ChatMessageRepository;
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

    public PaginatedChatMessagesDTO getChatHistory(final String sentBy, final String sentTo, final int pageNumber) throws UserNotFoundException, Exception {
        final User sentByUser = userRepository.findByEmail(sentBy).orElse(null);
        final Optional<User> sendToUser = userRepository.findByEmail(sentTo);
        if (sendToUser.isPresent()) {
            final PageRequest pageRequest = PageRequest.of(pageNumber, PAGE_SIZE);
            final Page<ChatMessage> chatMessages = chatMessageRepository.findChatMessageBySentByAndSentToOrderBySentAtDesc(sentByUser,
                    sendToUser.get(), pageRequest);

            final List<ChatMessageDTO> messages = chatMessages.stream().map(chatMessage ->
                    ChatMessageDTO.builder().message(chatMessage.getContent())
                            .sentAt(chatMessage.getSentAt().atZone(ZoneId.of("UTC")))
                            .email(chatMessage.getSentBy().getEmail()).build()).toList();
            return PaginatedChatMessagesDTO.builder().numPages(chatMessages.getTotalPages()).chatMessages(messages).build();
        } else {
            throw new Exception();
        }
    }


    public void saveChatHistory(final String sentBy, final String sentTo, final String content) throws UserNotFoundException {
        final User sentByUser = userRepository.findByUsername(sentBy);
        final Optional<User> sendToUser = Optional.ofNullable(userRepository.findByUsername(sentTo));
        if (sendToUser.isEmpty()) {
            throw new UserNotFoundException();
        }
        final ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(content);
        chatMessage.setSentBy(sentByUser);
        chatMessage.setSentTo(sendToUser.get());
        chatMessageRepository.save(chatMessage);
    }

    public List<UserDTO> getUsersWithChatHistory(final String userName) {
        final User user = userRepository.findByUsername(userName);
        final List<Long> userIds = chatMessageRepository.getDistinctUsersBySentByOrSentAt(user.getId());
        final List<User> users = userRepository.findAllById(userIds);
        return users.stream().map(userEntity -> modelMapper.map(userEntity, UserDTO.class)).collect(Collectors.toList());
    }
}