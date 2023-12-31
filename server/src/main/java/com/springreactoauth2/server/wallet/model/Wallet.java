package com.springreactoauth2.server.wallet.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private double balance;
    private double ghostBalance;

    public Wallet(double balance) {
        this.balance = balance;
        this.ghostBalance=0;
    }
}