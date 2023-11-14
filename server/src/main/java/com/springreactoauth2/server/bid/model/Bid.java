package com.springreactoauth2.server.bid.model;

import com.springreactoauth2.server.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long item_id; // what item the bid belongs to
    Long user_id; // who placed the bid
    Timestamp Time;
    Long Amount;
    String email; // represents the username of the user who placed the bid
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id",insertable = false,updatable = false)
    private User user;

    public Bid(Long id, Long item_id, Long user_id, Timestamp time, Long amount, String email) {
        this.id = id;
        this.item_id = item_id;
        this.user_id = user_id;
        this.Time = time;
        this.Amount = amount;
        this.email = email;
    }
}
