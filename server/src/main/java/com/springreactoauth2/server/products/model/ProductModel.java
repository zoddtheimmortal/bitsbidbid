package com.springreactoauth2.server.products.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long uid;
    private Long userId;
    private String name;
    private long buyPrice;
    private long firstBid;
    private long currentPrice;
    private int numberOfBids;
    private String description;
    //    private User sellerDetails;
    private String imgSrc;
    private boolean isActive;
    private boolean boughtFlag;
    private boolean hasImages;
    private boolean hasBids;
    private Long soldTo;
    Timestamp Started;
    Timestamp Ends;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(pattern = "yy-MM-dd hh:mm:ss")
    private Date dateCreated=new Date(new Date().getTime());


    public ProductModel(Long userId, String name, long buyPrice, String description, String imgSrc) {
        this.userId = userId;
        this.name = name;
        this.buyPrice = buyPrice;
        this.description = description;
        this.imgSrc = imgSrc;
    }
}
