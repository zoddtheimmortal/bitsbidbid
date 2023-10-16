package com.springreactoauth2.server.products.service;

import com.springreactoauth2.server.products.dao.ProductDao;
import com.springreactoauth2.server.products.model.ProductModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductDao productDao;

    @Override
    public List<ProductModel> showProducts() {
        return this.productDao.findAll();
    }

    @Override
    public ProductModel addProduct(ProductModel product) {
        productDao.save(product);
        return product;
    }

    @Override
    public ProductModel updateProduct(ProductModel product) {
        productDao.save(product);
        return product;
    }

    @Override
    public String deleteProduct(long id) {
        ProductModel entity=productDao.getReferenceById(id);
        productDao.delete(entity);
        return "Item deleted";
    }

    @Override
    public ResponseEntity<?> searchProduct(String query) {
        List<ProductModel> results = this.productDao.search(query);
        return ResponseEntity.ok(results);
    }


}