package com.springreactoauth2.server.products.controller;

import com.github.javafaker.Faker;
import com.springreactoauth2.server.chat.model.Chat;
import com.springreactoauth2.server.products.model.ProductModel;
import com.springreactoauth2.server.products.service.ProductService;
import com.springreactoauth2.server.user.model.User;
import com.springreactoauth2.server.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<ProductModel> showProducts(){
        return this.productService.showProducts();
    }

    @GetMapping("/find")
    public ResponseEntity<?> searchProduct(@RequestParam String query){
        return this.productService.searchProduct(query);
    }

    @GetMapping("/fuzzyFind")
    public ResponseEntity<?> searchFuzzy(@RequestParam String query){
        return this.productService.fuzzyMatch(query);
    }

    @GetMapping("/{id}")
    public ProductModel getProduct(@PathVariable long id){
        return this.productService.getProduct(id);
    }

    @GetMapping("/sellerName/{prodId}/{userId}")
    public ResponseEntity<?> getSellerName(@PathVariable long prodId,@PathVariable long userId){
        ProductModel product=productService.getProduct(prodId);
        User user=userRepository.findById(product.getUserId()).orElse(null);
        if(user!=null){
            if(product.isBoughtFlag() && product.getSoldTo()==userId){
                String firstName=(user.getFirstName()!=null)?user.getFirstName():"";
                String lastName=(user.getLastName()!=null)?user.getLastName():"";
                return new ResponseEntity<>(firstName+" "+lastName,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(user.getFakeName(),HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/sellerPic/{prodId}/{userId}")
    public ResponseEntity<?> getSellerPic(@PathVariable long prodId,@PathVariable long userId){
        ProductModel product=productService.getProduct(prodId);
        User user=userRepository.findById(product.getUserId()).orElse(null);
        if(user!=null){
            if(product.isBoughtFlag() && product.getSoldTo()==userId){
                String pic=user.getPictureUrl();
                return new ResponseEntity<>(pic,HttpStatus.OK);
            }
            else{
                String pic="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
                return new ResponseEntity<>(pic,HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/buyerName/{prodId}/{userId}")
    public ResponseEntity<?> getBuyerName(@PathVariable long prodId,@PathVariable long userId){
        ProductModel product=productService.getProduct(prodId);
        User user=userRepository.findById(userId).orElse(null);
        if(user!=null){
            if(product.isBoughtFlag() && product.getSoldTo()==userId){
                String firstName=(user.getFirstName()!=null)?user.getFirstName():"";
                String lastName=(user.getLastName()!=null)?user.getLastName():"";
                return new ResponseEntity<>(firstName+" "+lastName,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(user.getFakeName(),HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/buyerPic/{prodId}/{userId}")
    public ResponseEntity<?> getBuyerPic(@PathVariable long prodId,@PathVariable long userId){
        ProductModel product=productService.getProduct(prodId);
        User user=userRepository.findById(userId).orElse(null);
        if(user!=null){
            if(product.isBoughtFlag() && product.getSoldTo()==userId){
                String pic=user.getPictureUrl();
                return new ResponseEntity<>(pic,HttpStatus.OK);
            }
            else{
                String pic="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
                return new ResponseEntity<>(pic,HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/seller/all/{userId}")
    public ResponseEntity<?> getSellerProducts(@PathVariable long userId) throws Exception {
        try {
            List<ProductModel> allProducts = productService.showProducts();
            List<ProductModel> myProducts = new ArrayList<>();
            for (ProductModel product : allProducts) {
                if (product.getUserId() == userId) {
                    myProducts.add(product);
                }
            }
            myProducts.sort(Comparator.comparing(ProductModel::getDateCreated));
            return new ResponseEntity<>(myProducts,HttpStatus.OK);
        }catch (Exception e){
            throw new Exception();
        }
    }


    @GetMapping("/buyer/all/{userId}")
    public ResponseEntity<?> getBuyerProducts(@PathVariable long userId) throws Exception {
        try {
            List<ProductModel> allProducts = productService.showProducts();
            List<ProductModel> myProducts = new ArrayList<>();
            for (ProductModel product : allProducts) {
                if (product.getSoldTo()!=null && product.getSoldTo() == userId) {
                    myProducts.add(product);
                }
            }
            myProducts.sort(Comparator.comparing(ProductModel::getDateCreated));
            return new ResponseEntity<>(myProducts,HttpStatus.OK);
        }catch (Exception e){
            throw new Exception();
        }
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

