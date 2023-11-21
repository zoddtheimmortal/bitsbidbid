import { useEffect, useState } from "react";
import ProductService from "../api/product.service";
import Navbar from "../components/Navbar";

const ChatBox = ({userId,prodId}) => {
    const [loading,setLoading]=useState(true);
    const [sellerDetails,setSellerDetails]=useState({
        name:"",
        pfp:"",
    });
    const [prodData,setProdData]=useState(null);

    useEffect(()=>{
        fetchProdData(prodId);
        fetchSellerDetails(prodId,userId);
    },[]);

    const fetchProdData=async()=>{
        setLoading(true);
        const res=await ProductService.fetchProductData(prodId);
        console.log(res.data);
        setProdData(res.data);  
        setLoading(false);
    }

    const fetchSellerDetails=async()=>{
        setLoading(true);
        const res=await ProductService.fetchSellerDetails(prodId,userId);
        console.log(res);
        setSellerDetails(res);
        setLoading(false);
    }

    if(loading) return(<>Loading...</>);
    else{
        return(
            <div>
                <Navbar />
                <div className="grid bg-con-blue m-6 p-6 px-10">
                    <div className="grid grid-cols-2">
                        <img className="rounded-full" src={sellerDetails.pfp} alt="" />
                        <span>{sellerDetails.name}</span>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ChatBox;