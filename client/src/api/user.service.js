import axios from "axios";

const API_URL="http://localhost:8080/oauth2/user";

const fetchUserWithEmail=async(email)=>{
    const res=await axios.get(API_URL+`/find/${email}`);
    return res;
}

const UserService = {
    fetchUserWithEmail,
  };
  
export default UserService;