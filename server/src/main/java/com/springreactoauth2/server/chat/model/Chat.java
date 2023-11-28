package com.springreactoauth2.server.chat.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.annotation.Nullable;
import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long sentTo;
    private long sentBy;
    private long prodId;
    private String message;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yy-MM-dd hh:mm:ss")
    private Date sentAt=new Date(new Date().getTime());

    public Chat(long sentTo, long sentBy, long prodId, String message) {
        this.sentTo = sentTo;
        this.sentBy = sentBy;
        this.prodId=prodId;
        this.message = message;
    }
}
