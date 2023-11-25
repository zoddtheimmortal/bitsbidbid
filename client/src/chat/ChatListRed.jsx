import { useParams } from "react-router-dom";
import ChatList from "./ChatList";

const ChatListRed = () => {
    const {userId,prodId}=useParams();
    return (
        <ChatList prodId={prodId} userId={userId}></ChatList>
    );
}
 
export default ChatListRed;