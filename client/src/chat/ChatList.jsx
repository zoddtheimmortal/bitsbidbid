import { useEffect, useState } from "react";
import ChatService from "../api/chat.service";
import Navbar from "../components/Navbar";
import PillButton from "../components/PillButton";
import { useNavigate } from "react-router-dom";

const ChatList = ({prodId,userId}) => {
    const [loading,setLoading]=useState(true);
    const [chatList,setChatList]=useState([]);
    
    const navigate=useNavigate();

    const handleChatRedir=(buyerId)=>{
        navigate(`/chat/seller/${buyerId}/${userId}/${prodId}`);
    }

    const fetchChatList=async()=>{
        setLoading(true);
        const res=await ChatService.getChatList(prodId,userId);
        setChatList(res.data);
        console.log(chatList);
        setLoading(false);
    }

    useEffect(()=>{
        fetchChatList();
    },[])

    if(loading) return(<>Loading...</>);
    else{
        return (
            <div>
                <Navbar/>
                <div>
                    {(chatList.length==0?
                        (
                            <div className="flex justify-center text-xl mt-6 font-semibold">
                                No Chat Messages
                            </div>
                        ):
                        (
                            <div>
                                <div>
                                    <span className="flex justify-center text-xl my-2 font-semibold">Users</span>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mx-3">
                                {
                                    chatList.map((user)=>{
                                        return(
                                            <div className="
                                            flex 
                                            bg-con-blue 
                                            p-6 
                                            rounded-2xl
                                            border
                                            border-gray-600
                                            gap-6
                                            "
                                            key={user.userId}
                                            >
                                                <div>
                                                    <img src={user.picUrl}
                                                    className="w-32 h-32 rounded-full"
                                                    />
                                                </div>
                                                <div className="">
                                                  <div className="font-semibold text-2xl">
                                                    {user.name}
                                                  </div>
                                                  <div>
                                                    <PillButton className={"mt-3 py-2 px-8 bg-regal-blue border border-gray-600 text-gray-600 hover:text-gray-500"}
                                                    onClick={()=>handleChatRedir(user.userId)}
                                                    >Enter Chat</PillButton>
                                                  </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}
 
export default ChatList;