package com.springreactoauth2.server.chat.repository;

import com.springreactoauth2.server.chat.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat,Long> {
}
