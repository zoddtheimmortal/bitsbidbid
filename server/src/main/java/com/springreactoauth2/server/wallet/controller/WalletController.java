package com.springreactoauth2.server.wallet.controller;

import com.nimbusds.oauth2.sdk.http.HTTPRequest;
import com.springreactoauth2.server.user.model.User;
import com.springreactoauth2.server.user.service.UserService;
import com.springreactoauth2.server.wallet.service.WalletService;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/wallet")
@Configuration
public class WalletController {
    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<Double> getWalletBalance(@PathVariable Long userId) {
        double balance = walletService.getWalletBalance(userId);
        return ResponseEntity.ok(balance);
    }

    @PutMapping("/{userId}/{balance}")
    public ResponseEntity<?> addWalletBalance(@PathVariable(name = "userId") Long userId,@PathVariable(name="balance") Double balance){
        User user=walletService.addWalletBalance(userId,balance);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
}

