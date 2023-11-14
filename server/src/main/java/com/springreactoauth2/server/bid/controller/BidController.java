package com.springreactoauth2.server.bid.controller;

import com.springreactoauth2.server.bid.model.Bid;
import com.springreactoauth2.server.bid.repository.BidRepository;
import com.springreactoauth2.server.products.dao.ProductDao;
import com.springreactoauth2.server.products.model.ProductModel;
import com.springreactoauth2.server.user.model.User;
import com.springreactoauth2.server.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auction")
public class BidController {
    @Autowired
    private ProductDao productDao;
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private UserRepository userRepository;

    public BidController(ProductDao productDao, BidRepository bidRepository, UserRepository userRepository) {
        this.productDao = productDao;
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/all/{user_id}")
    public ResponseEntity<List<ProductModel>> getAllItemsWithUserId(@PathVariable Long user_id){
        List<ProductModel> products=productDao.findByUserId(user_id);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/bids/all/{item_id}")
    public ResponseEntity<List<Bid>> getAllBids(@PathVariable Long item_id){
        List<Bid> bids=bidRepository.findByItemId(item_id);
        return new ResponseEntity<>(bids,HttpStatus.OK);
    }

    @GetMapping("/active/all")
    public ResponseEntity<List<ProductModel>> getAllActiveItems(){
        List<ProductModel> active_products=productDao.findAllActiveItems();
        return new ResponseEntity<>(active_products,HttpStatus.OK);
    }

    @GetMapping("/winner/{item_id}")
    public ResponseEntity<?> getWinnerOfAuction(@PathVariable("item_id") Long item_id){
        List<Bid> allBids=bidRepository.findByItemId(item_id);
        if(allBids!=null){
            Bid maxBid=new Bid();
            long max=-1;
            for (Bid allBid : allBids) {
                if (max < allBid.getAmount()) {
                    max = allBid.getAmount();
                    maxBid = allBid;
                }
            }
//            System.out.println(maxBid.getUser().getEmail());
            Optional<User> winner=userRepository.findByEmail(maxBid.getUser().getEmail());
            return new ResponseEntity<>(winner,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/start/{id}/{mins}")
    public ResponseEntity<ProductModel> startAuction(@PathVariable("id") Long id,@PathVariable("mins") int mins){
        ProductModel productModel=productDao.findById(id).
                orElseThrow(IllegalArgumentException::new);
        productModel.setActive(true);

        Timestamp starts=new Timestamp(System.currentTimeMillis());
        productModel.setStarted(starts);
        Calendar calendar=Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE,mins);
        Timestamp ends=new Timestamp(calendar.getTimeInMillis());
        productModel.setEnds(ends);

        productDao.save(productModel);
        return new ResponseEntity<>(productModel,HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ProductModel> getAuctionById(@PathVariable("id") Long id) {
        ProductModel productModel = productDao.findById(id)
                .orElseThrow(IllegalArgumentException::new);
        return new ResponseEntity<>(productModel, HttpStatus.OK);
    }

    @PutMapping("/buy/{item_id}")
    public ResponseEntity<ProductModel> buyAuctionListing(@PathVariable("item_id") Long item_id) {
        ProductModel item = productDao.findById(item_id).get();
        // user has pressed buy button, listing is done
//        item.setIsActive(false);
        item.setBoughtFlag(true);
        productDao.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    //Post Requests
    @PostMapping("/bids/add/{item_id}/{user_id}")
    public ResponseEntity<Bid> addBid(@RequestBody Bid bid, @PathVariable("user_id") Long user_id, @PathVariable("item_id") Long item_id) {
        // from now on item has bids!
        ProductModel item = productDao.findById(item_id).get();
        item.setHasBids(true);

        bid.setId(new Random().nextLong());
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Bid newBid = new Bid(bid.getId(), item_id, user_id, time, bid.getAmount(), bid.getEmail());
        bidRepository.save(newBid);
        //updating current highest bid in auction
        if(item.getCurrentPrice() < bid.getAmount()) item.setCurrentPrice(bid.getAmount());
        item.setNumberOfBids(item.getNumberOfBids() + 1); // one more bid is added to the auction lisitng
        productDao.save(item);
        return new ResponseEntity<>(bid, HttpStatus.OK);
    }

    @PutMapping("/die/{id}")
    public ResponseEntity<ProductModel> timeForAuctionToDie(@PathVariable("id") Long id) {
        ProductModel item = productDao.findById(id).get();
        Date ends_stamp = new Date(item.getEnds().getTime());
        Date now = new Date();
        if(now.after(ends_stamp)) {
            item.setActive(false);
            productDao.save(item);
        }

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    // DELETE FUNCTIONS (DELETE)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAuction(@PathVariable("id") Long id) {
        productDao.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
