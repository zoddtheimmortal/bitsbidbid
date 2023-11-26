import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PillButton from "../components/PillButton";
import ProductService from "../api/product.service";
import UserService from "../api/user.service";
import { useSelector } from "react-redux";
import AuctionService from "../api/auction.service";

const AddProduct = () => {
    const user=useSelector((state) => state.user.user);
    const [loading,setLoading]=useState(true);
    const [formData,setFormData]=useState({
        name:"",
        description:"",
        imgSrc:"",
        currentPrice:0,
        userId:0,
    })

    const [end,setEnd]=useState(0);

    const handleSubmit=(e)=>{
        // console.log(user);
        e.preventDefault();
        postData();
    }

    const setUserId=async()=>{
        setLoading(true);
        const idUser=await UserService.fetchUserWithEmail(user.email);
        // console.log(idUser.data);
        setFormData({...formData,userId:idUser.data.id});
        setLoading(false);
    }

    useEffect(()=>{
        setUserId();
    },[])

    const postData=async()=>{
        const res=await ProductService.postData(formData);
        console.log(res.data);
        const auc=await AuctionService.startAuction(res.data.uid,end);
    }

    if(loading){
        return(<>Loading...</>)
    }
    else{
        return ( 
            <div>
                <Navbar></Navbar>
                <div className="font-mono mx-2">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <input
                                onChange={(e)=>setFormData({...formData,imgSrc:e.target.value})}
                                type="text"
                                placeholder="Enter Product Image Link"
                                className="
                                    w-full
                                    p-2
                                    px-4
                                    rounded-xl
                                    bg-con-blue
                                    border
                                    border-gray-600
                                    placeholder:text-gray-600
                                "
                                />
                            </div>
                            <div className="grid grid-rows-1 gap-2 mr-4">
                                <input type="text" 
                                name="" id="" placeholder="Enter Product Title"
                                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                                className="
                                    w-full
                                    p-2
                                    px-4
                                    rounded-xl
                                    bg-con-blue
                                    border
                                    border-gray-600
                                    placeholder:text-gray-600
                                "
                                />
                                <input type="text" 
                                name="" id="" placeholder="Enter Product Description" 
                                onChange={(e)=>setFormData({...formData,description:e.target.value})}
                                className="
                                w-full
                                p-2
                                px-4
                                rounded-xl
                                bg-con-blue
                                border
                                border-gray-600
                                placeholder:text-gray-600
                                "
                                />
                                <div 
                                className="
                                    bg-con-blue
                                    grid
                                    grid-rows-1
                                    gap-3
                                    p-4
                                    rounded-2xl
                                    border
                                    border-gray-600
                                ">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                        <span>Auction Time Span:</span>
                                        </div>
                                        <input type="text" 
                                        placeholder="Enter In Minutes"
                                        className="
                                        w-full
                                        p-2
                                        px-4
                                        rounded-xl
                                        bg-regal-blue
                                        border
                                        border-gray-600
                                        placeholder:text-gray-600
                                        "
                                        onChange={(e)=>setEnd(e.target.value)}
                                        />
                                        <div>
                                        <span>Starting Bid:</span> 
                                        </div>
                                        <div>
                                        <input type="text" 
                                        placeholder="Enter Starting Bid"
                                        onChange={(e)=>setFormData({...formData,currentPrice:e.target.value})}
                                        className="
                                        w-full
                                        p-2
                                        px-4
                                        rounded-xl
                                        bg-regal-blue
                                        border
                                        border-gray-600
                                        placeholder:text-gray-600
                                        "
                                        />
                                        </div>
                                    </div>
                                    <PillButton type="submit">Add Product</PillButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default AddProduct;