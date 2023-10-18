package com.springreactoauth2.server.wallet.model;

import lombok.Data;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@Data
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private double balance;

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
// Add getters and setters
}