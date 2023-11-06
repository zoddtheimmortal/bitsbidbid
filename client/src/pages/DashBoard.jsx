import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Navbar from "../components/Navbar";

export default function DashBoard() {

  const user = useSelector((state) => state.user.user);
  const [res,setRes]=useState([]);
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate("/search");
  }

  return (
    <div>
      <Navbar/>
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
          <span className="font-semibold">Wallet Balance: </span><span>{null}</span>
        </div>
        <div>
        <PillButton children="Add Balance" 
                className={"py-2 px-8 bg-regal-blue border border-gray-600 text-gray-600 hover:text-gray-500"}
                />
        </div>
      </div>
      </div>
    </div>
  );
}
