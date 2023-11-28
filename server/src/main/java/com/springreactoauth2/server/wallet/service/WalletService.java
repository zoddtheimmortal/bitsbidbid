package com.springreactoauth2.server.wallet.service;

import com.springreactoauth2.server.user.model.User;
import com.springreactoauth2.server.user.repository.UserRepository;
import com.springreactoauth2.server.wallet.model.Wallet;
import com.springreactoauth2.server.wallet.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService{
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private UserRepository userRepository;

    public double getWalletBalance(Long userId) {
        Optional<Wallet> wallet = walletRepository.findById(userId);
        return wallet.map(Wallet::getBalance).orElse(0.0);
    }

    public User addWalletBalance(Long userId,Double balance){
        User user=userRepository.findById(userId).orElse(null);
        if(user!=null){
            Wallet wallet=user.getWallet();
            wallet.setBalance(wallet.getBalance()+balance);
            userRepository.save(user);
            return user;
        }
        else return null;
    }
}