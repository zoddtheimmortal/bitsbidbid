import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Navbar from "../components/Navbar";
import UserService from "../api/user.service";
import WalletService from "../api/wallet.service";
import ProductService from "../api/product.service";

export default function DashBoard() {

  const userWithoutId = useSelector((state) => state.user.user);
  const [user,setUser]=useState([]);
  const [loading,setLoading]=useState(true);
  const [seen,setSeen]=useState(false);
  const [togglePane,setTogglePane]=useState(1);
  const [listings,setListings]=useState([]);
  const [purchases,setPurchases]=useState([]);

  const navigate=useNavigate();

  const togglePop=()=>{
    setSeen(!seen);
  }
  
  const fetchMyProducts=async(userId)=>{
    setLoading(true);
    const res=await ProductService.fetchMyListings(userId);
    setListings(res.data);
    // console.log(res.data);
    setLoading(false);
  }

  const fetchMyPurchases=async(userId)=>{
    setLoading(true);
    const res=await ProductService.fetchMyPurchases(userId);
    setPurchases(res.data);
    // console.log(res.data);
    setLoading(false);
  }

  const fetchUserData=async()=>{
    setLoading(true);
    const res=await UserService.fetchUserWithEmail(userWithoutId.email);
    await fetchMyProducts(res.data.id);
    await fetchMyPurchases(res.data.id);
    setLoading(false);
    // console.log(res.data);
    setUser(res.data);
  }

  const walletAdd=async(balance)=>{
    setLoading(true);
    const res=await WalletService.addBalance(balance,user.id);
    setUser(res.data);
    setLoading(false);
  }

  const handleProductRedir=(prodId)=>{
    navigate(`/product/${prodId}`);
  }

  const handleChatRedir=(prodId,userId)=>{
    navigate(`/chat/list/${userId}/${prodId}`)
  }

  const Popup=()=>{
    const [balance,setBalance]=useState(0);

    const handleSubmit=(e)=>{
      e.preventDefault();
      // console.log(balance);
      walletAdd(balance);
      togglePop();
    }

    return(
      <div className="fixed z-10 inset-1/4">
        <div className="flex items-center justify-center gap-1 h-full w-full">
        <form action="" onSubmit={handleSubmit}>
        <div className="opacity-75 m-2 bg-con-blue content-center rounded-3xl p-10 border border-gray-400">
          <div className="font-semibold py-2">Add Wallet Balance</div>
          <input type="text" onChange={(e)=>setBalance(e.target.value)}
          className="bg-regal-blue border border-gray-600 p-2 px-3 rounded-xl"
          placeholder="Enter Amount" />
          <button className="
          z-30
          p-2
          px-3 
          bg-royal-green
          text-black
          rounded-xl
          hover:bg-lime-600
          ">
          Add Balance
          </button>
        </div>
        </form>
      </div>
      </div>
    )
  }

  const DisplayProducts=()=>{
    if(togglePane==1 && !(listings.length==0)){
      return(
        listings.map((item)=>{
          return(
            <div key={item.uid} className="
            mx-1
            w-3/4
            bg-con-blue
            rounded-2xl
            border
            border-gray-700
            p-4
            ">
              <div className="flex gap-6 justify-items-start">
                <div>
                  <img src={item.imgSrc} className="object-cover h-36 w-36 rounded-full" alt="" />
                </div>
                <div>
                  <div className="font-semibold text-2xl">
                    {item.name}
                  </div>
                  <div className="text-gray-300">
                    {item.description}
                  </div>
                  <div>
                    <PillButton className={"mt-3 py-2 px-8 bg-regal-blue border border-gray-600 text-gray-600 hover:text-gray-500"}
                    onClick={()=>handleChatRedir(item.uid,user.id)}
                    >Enter Chat</PillButton>
                  </div>
                  <div>
                  <PillButton className={"py-2 px-8 bg-gray-800 border-2 border-black text-black hover:text-gray-500"}
                  onClick={()=>handleProductRedir(item.uid)}
                    >View Product</PillButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )
    }
    else{
      <>Hello 2</>
    }
  }

  useEffect(()=>{
    fetchUserData();

  },[]);

  if(loading) return(<>Loading...</>)
  else{
    return (
      <div>
        <div>
        <div>
        <Navbar/>
        {seen?<Popup/>:null}
        <div>
          <div className="grid grid-cols-2 m-2 bg-con-blue content-center rounded-3xl p-5 border border-gray-400">
          <div>
            <img src={user.pictureUrl} alt=""
              className="
                rounded-full
                w-1/3
              "/>
          </div>
          <div className="grid grid-rows-1 justify-start gap-1">
          <div className="text-3xl">
            <span className="font-light">Welcome, </span>
            <span className="font-semibold">{user.firstName}{user.lastName?user.lastName:""}!</span>
          </div>
          <div>
            {user.email}
          </div>
          <div>
            <span className="font-semibold">Purchases: </span><span>{null}</span>
          </div>
          <div>
            <span className="font-semibold">Wallet Balance: </span>
            <span className="font-semibold">{user.wallet.balance} BC  </span>
            <span className="text-gray-400">/ {user.wallet.ghostBalance} BC</span>
          </div>
          <div>
          <PillButton children="Add Balance" 
                  className={"py-2 px-8 bg-regal-blue border border-gray-600 text-gray-600 hover:text-gray-500"}
                  onClick={togglePop}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="selector">
          <div className="m-2 mx-4 text-2xl">
            <span className="font-semibold">My Products </span>
            <span className="text-gray-400">My Purchases</span>
          </div>
        </div>
        <div className="grid grid-cols-1 m-2 gap-2">
          <DisplayProducts/>
        </div>
      </div>
    );
  }
}
