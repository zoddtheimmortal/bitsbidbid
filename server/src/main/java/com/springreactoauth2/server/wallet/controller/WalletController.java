package com.springreactoauth2.server.wallet.controller;

import com.springreactoauth2.server.wallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/wallet")
@Configuration
public class WalletController {
    @Autowired
    private WalletService walletService;

    @GetMapping("/{userId}")
    public ResponseEntity<Double> getWalletBalance(@PathVariable Long userId) {
        double balance = walletService.getWalletBalance(userId);
        return ResponseEntity.ok(balance);
    }
}

