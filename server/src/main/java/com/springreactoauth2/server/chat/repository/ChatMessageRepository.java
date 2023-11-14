package com.springreactoauth2.server.chatBck.repository;

import com.springreactoauth2.server.chatBck.model.ChatMessage;
import com.springreactoauth2.server.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {

    // TODO: Offset pagination not working when user posts new messages as it can result in duplicates
    @Query("SELECT chatMessage FROM ChatMessage chatMessage WHERE (chatMessage.sentBy = ?1 AND chatMessage.sentTo = ?2) OR (" +
            "chatMessage.sentTo = ?1 AND chatMessage.sentBy = ?2) ORDER BY chatMessage.sentAt DESC")
    Page<ChatMessage> findChatMessageBySentByAndSentToOrderBySentAtDesc(User sentBy, User sentTo, Pageable pageable);

    @Query(value = "SELECT DISTINCT(sent_to_id) FROM chat_message WHERE sent_by_id = ?1 \n" +
            "UNION\n" +
            "SELECT DISTINCT(sent_by_id) FROM chat_message WHERE sent_to_id = ?1", nativeQuery = true)
    List<Long> getDistinctUsersBySentByOrSentAt(Long userId);
}

