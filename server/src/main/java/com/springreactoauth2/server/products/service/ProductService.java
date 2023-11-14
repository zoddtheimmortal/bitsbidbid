package com.springreactoauth2.server.products.service;

import com.springreactoauth2.server.products.model.ProductModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    List<ProductModel> showProducts();

    ProductModel addProduct(ProductModel product);

    ProductModel updateProduct(ProductModel product);

    String deleteProduct(long l);

    ResponseEntity<?> searchProduct(String query);

    ProductModel getProduct(long id);

}
