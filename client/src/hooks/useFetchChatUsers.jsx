import axios from "axios"
import { useQuery } from "react-query"

const fetchChatHistoryUsers = async () => {
    const response=await axios.get(
        `${process.env.VITE_APP_API_URL}/chat/chatHistoryUsers`,
        {withCredentials:true});

    const data = response.data;
    return data
  }

const useChatUsers = () => {
    const fetchChatUsersQuery = useQuery<Array<User>>(
        "fetchChatUsers",
        () => {
          return fetchChatHistoryUsers()
        }
      )
    
      return fetchChatUsersQuery
}
 
export default useChatUsers;