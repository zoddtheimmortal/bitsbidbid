import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Navbar from "../components/Navbar";
import UserService from "../api/user.service";
import WalletService from "../api/wallet.service";

export default function DashBoard() {

  const userWithoutId = useSelector((state) => state.user.user);
  const [user,setUser]=useState([]);
  const [loading,setLoading]=useState(true);
  const [seen,setSeen]=useState(false);

  const togglePop=()=>{
    setSeen(!seen);
  }

  const fetchUserData=async()=>{
    setLoading(true);
    const res=await UserService.fetchUserWithEmail(userWithoutId.email);
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

  useEffect(()=>{
    fetchUserData();

  },[]);

  if(loading) return(<>Loading...</>)
  else{
    return (
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
    );
  }
}
