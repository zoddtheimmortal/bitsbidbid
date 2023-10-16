package com.springreactoauth2.server.user.dto;

import com.springreactoauth2.server.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String firstName;

    private String lastName;

    private String email;

    private String pictureUrl;

    public static final UserDto convertToDto(User user) {
        return UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}
