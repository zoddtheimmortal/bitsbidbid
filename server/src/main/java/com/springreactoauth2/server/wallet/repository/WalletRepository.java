package com.springreactoauth2.server.wallet.repository;

import com.springreactoauth2.server.products.model.ProductModel;
import com.springreactoauth2.server.wallet.model.Wallet;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Configuration
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    @Query("SELECT record FROM Wallet record WHERE record.userId=?1")
    public List<Wallet> findByUserId(Long user_id);
}
