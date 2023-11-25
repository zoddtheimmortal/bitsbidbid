import { useParams } from "react-router-dom";
import ChatSeller from "./ChatSeller";

const ChatSellerRedir = () => {
    const {buyerId,sellerId,prodId}=useParams();
    return (
        <ChatSeller buyerId={buyerId} sellerId={sellerId} prodId={prodId}/>
    );
}
 
export default ChatSellerRedir;