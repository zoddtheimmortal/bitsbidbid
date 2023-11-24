import { useEffect, useState } from "react";
import ProductService from "../api/product.service";
import Navbar from "../components/Navbar";
import ChatService from "../api/chat.service";

const ChatBox = ({userId,prodId}) => {
    const [loading,setLoading]=useState(true);
    const [fetching,setFetching]=useState(true);
    const [sellerDetails,setSellerDetails]=useState({
        name:"",
        pfp:"",
    });
    const [prodData,setProdData]=useState(null);
    const [message,setMessage]=useState("");
    const [chatHistory,setChatHistory]=useState([]);
    const [init,setInit]=useState(false);

    useEffect(()=>{
        fetchProdData();
        fetchSellerDetails(prodId,userId);
    },[]);

    useEffect(()=>{
        if(init){
            const interval = setInterval(
                () =>{
                    getHistory(prodData.uid,prodData.userId);
                }
                ,
                1000,
            );
    
            return () => clearInterval(interval);
        }
    })

    const fetchProdData=async()=>{
        setLoading(true);
        const res=await ProductService.fetchProductData(prodId);
        // console.log(res.data);
        setProdData(res.data);
        await getHistory(res.data.uid,res.data.userId);
        setInit(true);
        setLoading(false);
    }

    const fetchSellerDetails=async()=>{
        setLoading(true);
        const res=await ProductService.fetchSellerDetails(prodId,userId);
        // console.log(res);
        setSellerDetails(res);
        setLoading(false);
    }

    const postMessage=async()=>{
        const data={
            sentBy:userId,
            sentTo:prodData.userId,
            prodId:prodId,
            message:message
        }
        const res=await ChatService.sendMessage(data);
        console.log(res.data);
    }

    const getHistory=async(prodId,sellerId)=>{
        // setLoading(true);
        const response=await ChatService.getChatHistory(userId,sellerId,prodId);
        setChatHistory(response.data);
        // console.log(response.data);
        // setLoading(false);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        postMessage();
        setMessage("");
    }


    if(loading) return(<>Loading...</>);
    else{
        return(
            <div>
                <Navbar />
                <div className="grid bg-con-blue m-6 p-6 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <img className="rounded-full max-h-20 max-w-20" src={sellerDetails.pfp} alt="" />
                            </div>
                            <div className="grid justify-start">
                                <span className="text-xl md:text-2xl font-semibold text-center">{sellerDetails.name}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 my-2 md:my-1">
                            <div>
                                <span className="font-bold text-xl">Product Data</span>
                            </div>
                            <div>
                                <div className="font-semibold">
                                    {prodData.name}
                                </div>
                                <div className="text-sm">
                                    {prodData.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="m-2 my-4 p-4 bg-regal-blue border border-gray-500 rounded-xl">
                        <div className="grid grid-cols-1 gap-2 flow-root">
                            {chatHistory.map((chat)=>{
                                if(loading){
                                    return(<>Loading...</>);
                                }
                                else{
                                    if(chat.sentBy==userId){
                                        return(
                                            <div className="">
                                                <div className="
                                                grid 
                                                grid-cols-1 
                                                justify-start 
                                                bg-con-blue
                                                rounded-l-2xl
                                                rounded-tr-2xl
                                                float-right
                                                text-right
                                                p-2
                                                px-8
                                                ">
                                                    <div>
                                                        {chat.sentAt}
                                                    </div>
                                                    <div>
                                                        {chat.message}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else{
                                        return(
                                            <div>
                                                <div className="
                                                grid 
                                                grid-cols-1 
                                                justify-start 
                                                bg-gray-900
                                                rounded-r-2xl
                                                rounded-tl-2xl
                                                float-left
                                                text-left
                                                p-2
                                                px-8
                                                ">
                                                    <div>
                                                        {chat.sentAt}
                                                    </div>
                                                    <div>
                                                        {chat.message}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                        <div>
                            <form action="" onSubmit={handleSubmit}>
                                <input type="text" placeholder="Type Message" 
                                className="
                                text-white
                                bg-con-blue
                                p-2
                                px-5
                                mb-3
                                rounded-l-xl
                                border
                                w-3/4
                                border-gray-600
                                placeholder:text-gray-500
                                justify-items-center
                                placeholder:font-semibold
                                
                                "
                                onChange={(e)=>setMessage(e.target.value)}/>
                                <button type="submit" className="
                                 bg-royal-green
                                 hover:bg-lime-600
                                 text-black
                                 my-2
                                 py-2
                                 px-4
                                 rounded-r-xl
                                ">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}
 
export default ChatBox;