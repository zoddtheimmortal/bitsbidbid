package com.springreactoauth2.server.wallet.service;

import com.springreactoauth2.server.wallet.model.Wallet;
import com.springreactoauth2.server.wallet.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService{
    @Autowired
    private WalletRepository walletRepository;

    Optional<Wallet> findByUserId(Long userId) {
        return null;
    }

    public double getWalletBalance(Long userId) {
        Optional<Wallet> wallet = walletRepository.findById(userId);
        return wallet.map(Wallet::getBalance).orElse(0.0);
    }
}