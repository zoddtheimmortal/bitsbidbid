package com.springreactoauth2.server.bid.repository;

import com.springreactoauth2.server.bid.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid,Long> {
    @Query("SELECT record FROM Bid record WHERE record.item_id=?1")
    List<Bid> findByItemId(Long item_id);
}
