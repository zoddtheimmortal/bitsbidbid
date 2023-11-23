import axios from "axios";

const API_URL="http://localhost:8080/wallet";

const addBalance=async(balance,userId)=>{
    const res=await axios.put(API_URL+`/${userId}/${balance}`);
    return res;
}

const WalletService = {
    addBalance,
  };
  
export default WalletService;