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
            User winner=userRepository.findByEmail(maxBid.getUser().getEmail()).orElse(null);
            if(winner!=null){
                return new ResponseEntity<>(winner,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
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
    public ResponseEntity<?> addBid(@RequestBody Bid bid, @PathVariable("user_id") Long user_id, @PathVariable("item_id") Long item_id) {
        // from now on item has bids!
        ProductModel item = productDao.findById(item_id).get();
        item.setHasBids(true);
        User user=userRepository.findById(user_id).orElse(null);
        if(user!=null){
            long balance= (long) user.getWallet().getBalance();
            long maxBid=0;
            List<Bid> allBids=getAllBids(item_id).getBody();
            for(Bid prevBid:allBids){
                if(prevBid.getUser_id()==user_id){
                    if(prevBid.getAmount()>maxBid) maxBid=prevBid.getAmount();
                }
            }
            if(maxBid<bid.getAmount() && bid.getAmount()>item.getBuyPrice()){
                user.getWallet().setBalance(balance+maxBid);
                user.getWallet().setGhostBalance(user.getWallet().getGhostBalance()-maxBid);
                balance=(long) user.getWallet().getBalance();

                if(balance>= bid.getAmount()){
                    bid.setId(new Random().nextLong());
                    Timestamp time = new Timestamp(System.currentTimeMillis());
                    Bid newBid = new Bid(bid.getId(), item_id, user_id, time, bid.getAmount(), bid.getEmail());
                    user.getWallet().setBalance(balance- bid.getAmount());
                    user.getWallet().setGhostBalance(user.getWallet().getGhostBalance()+bid.getAmount());
                    bidRepository.save(newBid);
                    //updating current highest bid in auction
                    if(item.getCurrentPrice() < bid.getAmount()) item.setCurrentPrice(bid.getAmount());
                    item.setNumberOfBids(item.getNumberOfBids() + 1); // one more bid is added to the auction lisitng
                    productDao.save(item);
                    return new ResponseEntity<>(bid, HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
                }
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/die/{id}")
    public ResponseEntity<ProductModel> timeForAuctionToDie(@PathVariable("id") Long id) {
        ProductModel item = productDao.findById(id).get();
        Date ends_stamp = new Date(item.getEnds().getTime());
        Date now = new Date();
        if(true) {
            item.setActive(false);
            productDao.save(item);
            List<Bid> allBids=bidRepository.findByItemId(id);
            if(allBids!=null){
                Bid maxBid=new Bid();
                long max=-1;
                HashMap<Long,Long> prevAmt=new HashMap<>();
                System.out.println(allBids);
                for (Bid allBid : allBids) {
                    if (max < allBid.getAmount()) {
                        max = allBid.getAmount();
                        maxBid = allBid;
                    }
                    if(prevAmt.get(allBid.getUser_id())!=null){
                        if(prevAmt.get(allBid.getUser_id())<allBid.getAmount()){
                            System.out.println(allBid.getAmount());
                            prevAmt.put(allBid.getUser_id(),allBid.getAmount());
                        }
                    }
                    else{
                        prevAmt.put(allBid.getUser_id(),(long)0);
                        if(prevAmt.get(allBid.getUser_id())<allBid.getAmount()){
                            System.out.println(allBid.getAmount());
                            prevAmt.put(allBid.getUser_id(),allBid.getAmount());
                        }
                    }
                }
                System.out.println(prevAmt);
                User winner=userRepository.findByEmail(maxBid.getUser().getEmail()).orElse(null);
                User seller=userRepository.findById(item.getUserId()).orElse(null);
                if(winner!=null){
                    Set<Long> idSet=prevAmt.keySet();
                    for(Long ids:idSet){
                        User user=userRepository.findById(ids).orElse(null);
                        if(user!=null && !Objects.equals(user.getId(), winner.getId())){
                            System.out.println(ids+" "+prevAmt.get(ids));
                            user.getWallet().setBalance(user.getWallet().getBalance()+prevAmt.get(ids));
                            user.getWallet().setGhostBalance(user.getWallet().getGhostBalance()-prevAmt.get(ids));
                            userRepository.save(user);
                        }
                    }
                    item.setBoughtFlag(true);
                    item.setSoldTo(winner.getId());
                    productDao.save(item);
                    winner.getWallet().setGhostBalance(winner.getWallet().getGhostBalance()-maxBid.getAmount());
                    assert seller != null;
                    seller.getWallet().setBalance(seller.getWallet().getBalance()+maxBid.getAmount());
                    userRepository.save(winner);
                }
            }
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
