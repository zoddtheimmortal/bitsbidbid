package com.springreactoauth2.server.chat.service;

import com.springreactoauth2.server.chat.model.Chat;
import com.springreactoauth2.server.chat.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    ChatRepository chatRepository;

    public ResponseEntity<?> getAllMessages(){
        List<Chat> allChats=chatRepository.findAll();
        if(!allChats.isEmpty()){
            return new ResponseEntity<>(allChats, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    public ResponseEntity<?> sendChat(Chat chat){
        try{
            chatRepository.save(chat);
            return new ResponseEntity<>(chat,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
}
