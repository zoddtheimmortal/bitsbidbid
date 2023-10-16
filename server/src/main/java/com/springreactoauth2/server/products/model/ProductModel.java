package com.springreactoauth2.server.products.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long uid;
    private String name;
    private long price;
    private long maxBid;
    private String desc;
    //    private User sellerDetails;
    private String imgSrc;
    @Override
    public String toString() {
        return "ProductModel{" +
                "uid=" + uid +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", maxbid=" + maxBid +
                ", desc='" + desc + '\'' +
                '}';
    }

    public ProductModel(String name, long price, long maxBid, String desc, String imgSrc) {
        this.name = name;
        this.price = price;
        this.maxBid = maxBid;
        this.desc = desc;
        this.imgSrc = imgSrc;
    }
}
