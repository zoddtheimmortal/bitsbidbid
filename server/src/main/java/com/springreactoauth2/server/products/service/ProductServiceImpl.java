package com.springreactoauth2.server.products.service;

import com.springreactoauth2.server.products.dao.ProductDao;
import com.springreactoauth2.server.products.model.ProductModel;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public ProductModel getProduct(long uid){
        try{
            return productDao.findById(uid).get();
        }catch (Exception err){
            return null;
        }
    }

    @Override
    public ResponseEntity<?> fuzzyMatch(String query){
        List<ProductModel> allItems=productDao.findAll();
        List<ProductModel> res= allItems.stream()
                .filter(product -> isMatch(product,query))
                .collect(Collectors.toList());

        if(res.isEmpty()){
            res=productDao.search(query);
        }

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    public boolean isMatch(ProductModel product,String query){
        int nameSim=FuzzySearch.partialRatio(product.getName(),query);
        int descSim=FuzzySearch.partialRatio(product.getDescription(),query);

        int simThreshold=60;

        return nameSim > simThreshold || descSim > simThreshold;
    }

}