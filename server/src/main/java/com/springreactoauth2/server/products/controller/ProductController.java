package com.springreactoauth2.server.products.controller;

import com.springreactoauth2.server.products.model.ProductModel;
import com.springreactoauth2.server.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @GetMapping("/all")
    public List<ProductModel> showProducts(){
        return this.productService.showProducts();
    }

    @GetMapping("/find")
    public ResponseEntity<?> searchProduct(@RequestParam String query){
        return this.productService.searchProduct(query);
    }

    @GetMapping("/{id}")
    public ProductModel getProduct(@PathVariable long id){
        return this.productService.getProduct(id);
    }
    @PostMapping("/")
    public ProductModel addProduct(@RequestBody ProductModel product){
        return this.productService.addProduct(product);
    }

    @PutMapping("/")
    public ProductModel updateProduct(@RequestBody ProductModel product){
        return this.productService.updateProduct(product);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable String id){
        try{
            return this.productService.deleteProduct(Long.parseLong(id));}
        catch(Exception err){
            return "Item not found "+err;
        }
    }
}

