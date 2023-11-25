import { useParams } from "react-router-dom";
import ChatBox from "./ChatBox";

const Chat = () => {
    const {userid,prodid}=useParams();
    return (
        <ChatBox userId={userid} prodId={prodid}/>
    );
}
 
export default Chat;