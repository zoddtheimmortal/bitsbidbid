package com.springreactoauth2.server.products.dao;

import com.springreactoauth2.server.products.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDao extends JpaRepository<ProductModel,Long> {

    //contextual search method
    //make a fulltext index in mysql-> table.column should be the query!
    //?1 means first parameter passed
    //refer to vid for exact details
    //ref:https://www.youtube.com/watch?v=WPMQdnwPJLc&t=568s
    @Query(value="SELECT * FROM product_model WHERE MATCH(product_model.name,product_model.description) AGAINST(?1 IN NATURAL LANGUAGE MODE)",nativeQuery = true)
    public List<ProductModel> search(String name);

    @Query("SELECT record FROM ProductModel record WHERE record.userId=?1")
    public List<ProductModel> findByUserId(Long user_id);

    @Query("SELECT record FROM ProductModel record WHERE record.isActive=true")
    public List<ProductModel> findAllActiveItems();
}
