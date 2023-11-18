import axios from "axios";

const fetchChatHistory = async(withUser,pageNumber) => {
    const response=await axios.get(
        `${process.env.VITE_APP_API_URL}/chat/chatHistory/${withUser}?pageNumber=${pageNumber ?? 0}`,
        {withCredentials:true}
    );
    const data = response.data;
    return Promise.resolve(data.chatMessages);
}
 
export default fetchChatHistory;