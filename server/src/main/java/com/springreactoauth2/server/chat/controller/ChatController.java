package com.springreactoauth2.server.chat.controller;

import com.springreactoauth2.server.chat.model.Chat;
import com.springreactoauth2.server.chat.model.LimUser;
import com.springreactoauth2.server.chat.repository.ChatRepository;
import com.springreactoauth2.server.products.model.ProductModel;
import com.springreactoauth2.server.products.service.ProductService;
import com.springreactoauth2.server.user.model.User;
import com.springreactoauth2.server.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    ChatRepository chatRepository;
    @Autowired
    ProductService productService;
    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getAllMessages(){
        List<Chat> allChats=chatRepository.findAll();
        if(!allChats.isEmpty()){
            return new ResponseEntity<>(allChats, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    @PostMapping("/send")
    public ResponseEntity<?> sendChat(@RequestBody Chat chat){
        try{
            chatRepository.save(chat);
            return new ResponseEntity<>(chat,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteChat(@RequestBody Chat chat){
        try{
            chatRepository.delete(chat);
            return new ResponseEntity<>(chat,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteChat(@PathVariable long id){
        Chat chat=chatRepository.findById(id).orElse(null);
        try{
            chatRepository.delete(chat);
            return new ResponseEntity<>(chat,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/history/{user1}/{user2}/{prodId}")
    public ResponseEntity<?> getChatHistory(@PathVariable long user1, @PathVariable long user2,@PathVariable long prodId){
        List<Chat> allChats=chatRepository.findAll();
        List<Chat> chatHistory=new ArrayList<>();
        for(Chat chat:allChats){
            if((chat.getSentBy()==user1 && chat.getSentTo()==user2 && chat.getProdId()==prodId)
                    ||(chat.getSentBy()==user2 && chat.getSentTo()==user1 && chat.getProdId()==prodId)){
                chatHistory.add(chat);
            }
        }
        chatHistory.sort(Comparator.comparing(Chat::getSentAt));
        return new ResponseEntity<>(chatHistory,HttpStatus.OK);
    }

    @GetMapping("/list/{prodId}/{userId}")
    public ResponseEntity<?> getChatList(@PathVariable long prodId, @PathVariable long userId){
        List<Chat> allChats=chatRepository.findAll();
        Set<Long> ids=new HashSet<>();
        List<LimUser> users=new ArrayList<>();
        for(Chat chat:allChats){
            if(chat.getProdId()==prodId){
                long id=(chat.getSentBy()==userId)?(chat.getSentTo()):(chat.getSentBy());
                ids.add(id);
            }
        }
        for(long id:ids){
            users.add(new LimUser(id,getBuyerName(prodId,id),getBuyerPic(prodId,id)));
        }
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    public String getBuyerName(long prodId,long userId){
        ProductModel product=productService.getProduct(prodId);
        User user=userRepository.findById(userId).orElse(null);
        if(user!=null){
            if(product.isBoughtFlag() && product.getSoldTo()==userId){
                String firstName=(user.getFirstName()!=null)?user.getFirstName():"";
                String lastName=(user.getLastName()!=null)?user.getLastName():"";
                return firstName+" "+lastName;
            }
            else{
                return user.getFakeName();
            }
        }
        else{
            return null;
        }
    }

    public String getBuyerPic(long prodId,long userId){
        ProductModel product=productService.getProduct(prodId);
        User user=userRepository.findById(userId).orElse(null);
        if(user!=null){
            if(product.isBoughtFlag() && product.getSoldTo()==userId){
                return user.getPictureUrl();
            }
            else{
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
            }
        }
        else{
            return null;
        }
    }
}
