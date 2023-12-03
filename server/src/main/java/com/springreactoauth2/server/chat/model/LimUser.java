package com.springreactoauth2.server.chat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LimUser {
    private long userId;
    private String name;
    private String picUrl;
}
