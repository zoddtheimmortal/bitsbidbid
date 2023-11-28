package com.springreactoauth2.server.user.model;

import com.github.javafaker.Faker;
import com.springreactoauth2.server.wallet.model.Wallet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String pictureUrl;

    private String roles;

    @OneToOne(cascade = CascadeType.ALL)
    private Wallet wallet;

    private String fakeName;

    public User(String firstName, String lastName, String email, String pictureUrl) {
        Faker faker=new Faker();

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pictureUrl = pictureUrl;
        this.wallet=new Wallet(1000);
        this.fakeName=faker.name().firstName()+" "+faker.name().lastName();
    }
}



