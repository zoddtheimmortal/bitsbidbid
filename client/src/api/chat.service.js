import axios from "axios";

const API_URL="http://localhost:8080/chat";

const getAllMessages=async()=>{
    const res=axios.get(API_URL+`/all`);
    return res;
}

const getChatHistory=async(user1,user2,prodId)=>{
    const res=axios.get(API_URL+`/history/${user1}/${user2}/${prodId}`);
    return res;
}

const sendMessage=async(messageData)=>{
    try{
        const config = { 'content-type': 'application/json' };
        const res=await axios.post("http://localhost:8080/chat/send",messageData,config);
        return res;
    }catch(e){
        console.error(e.response.data);
    }
}

const ChatService = {
    sendMessage,
    getChatHistory,
    getAllMessages,
  };
  
export default ChatService;