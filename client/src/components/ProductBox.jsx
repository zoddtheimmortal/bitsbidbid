import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../hooks/Timer";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import ProductService from "../api/product.service";
import UserService from "../api/user.service";
import AuctionService from "../api/auction.service";

const ProductBox = ({id}) => {
    const navigate=useNavigate();
    const [prodData,setProdData]=useState([]);
    const user=useSelector((state) => state.user.user);
    const [userWithId,setUserWithID]=useState([]);
    const [bidAmt,setBidAmt]=useState(0);

    const fetchProductData=async()=>{
        const res=await ProductService.fetchProductData(id);
        setProdData(res.data);
        // console.log(res.data);
    }

    const fetchUserData=async()=>{
        const res=await UserService.fetchUserWithEmail(user.email);
        // console.log(res.data);
        setUserWithID(res.data);
    }

    useEffect(()=>{
        fetchProductData();
        fetchUserData();
    },[]);

    const placeBid=async()=>{
        const res=await AuctionService.addBid(bidAmt,prodData.uid,userWithId.id);
        // console.log(res.data);
        alert(`Bid of ${bidAmt} placed for ${prodData.name}!`);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        placeBid();
        // navigate("/search");
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-center items-center justify-items-start m-2">
                <div>
                        <img src={
                        prodData.imgSrc
                        ?prodData.imgSrc
                        :"https://cdn.vox-cdn.com/uploads/chorus_asset/file/23759761/bfarsace_190101_5333_0008.jpg"}
                         alt=""
                         className="rounded-3xl imagePro border-4 border-gray-200"
                          />
                </div>
                <div className="font-mono">
                    <div className="text-3xl font-semibold">{prodData.name}</div>
                    <div>{prodData.description}</div>
                    <div className="bg-con-blue grid gap-1 rounded-xl p-4">
                        <div className="text-2xl font-bold font-mono">Time Left:</div>
                        <Timer 
                        deadline={prodData.ends?prodData.ends:"2023-12-31T23:40:48"}
                        className="rounded-xl bg-royal-green"
                        id={id}
                        active={prodData.active}
                        />
                        <div className="font-mono">
                            <span className="font-bold">Bid End Date: </span>
                            <span>2023-12-31T23:59:59</span>
                        </div>
                        <div className="font-mono">
                            <span className="font-bold">Current Bid: </span>
                            <span>{prodData.currentPrice}</span>   
                        </div>
                        <div>
                            <form action="" onSubmit={handleSubmit}>
                                <div>
                                    <input type="text" placeholder="BC" 
                                    className="rounded-2xl p-2 px-3 bg-regal-blue border-gray-600 border-2 text-gray-400 placeholder:text-gray-500"
                                    onChange={(e)=>setBidAmt(e.target.value)}
                                     />
                                </div>
                                <button type="submit"
                                className="rounded-2xl
                                bg-royal-green
                                border
                                border-transparent
                                m-1
                                px-6
                                py-2
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                text-neutral-800
                                font-semibold
                                hover:scale-105
                                hover:text-black
                                transition"
                                >
                                    Place Bid
                                </button>
                                {(prodData.creationId==userWithId.id)?(
                                    <button type="submit"
                                    className="rounded-2xl
                                    bg-royal-green
                                    border
                                    border-transparent
                                    m-1
                                    px-6
                                    py-2
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    text-neutral-800
                                    font-semibold
                                    hover:scale-105
                                    hover:text-black
                                    transition"
                                    >
                                        Delete Product
                                    </button>
                                ):null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProductBox;